---
title: "Cast: YAML tasks and VS Code schemas"
description: "Cast is a YAML-native task runner. Install it, run bash, PowerShell, Bun, Deno, or Ruby tasks, wire SSH, and edit castfiles with JSON Schema in VS Code."
pubDate: 2026-03-15
---

I built [**Cast**](https://github.com/frostyeti/cast) as a **task runner** for local scripts, remote execution, and reusable task packages. You describe work in a **`castfile`** (YAML): task names, a `uses:` runner (`shell`, `bash`, `pwsh`, `bun`, `deno`, `ruby`, `ssh`, Docker, remote refs, and more), and a `run:` block. The CLI exposes tasks as `cast list`, direct `cast hello`, and `cast run hello` style commands.

This post covers **install**, **runner examples** (including inline scripts), a **minimal SSH** task with **inventory**, **experimental modules and remote task files**, and **VS Code** validation via Red Hat’s YAML extension plus the JSON schemas shipped in the repo. For the full surface area, see the [repository README](https://github.com/frostyeti/cast/blob/master/README.md) and the in-repo [task reference](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/task.md).

**Note:** the repo currently lives under **`frostyeti/cast`**. It will **migrate to [`voidbear-io`](https://github.com/voidbear-io)** on GitHub. After the move, swap `frostyeti` for `voidbear-io` in install URLs, clones, and raw links. Re-copy `schemas/` if the published JSON Schema changes.

## Install Cast

### Linux and macOS

```bash
curl -sL https://raw.githubusercontent.com/frostyeti/cast/master/eng/scripts/install.sh | bash
```

### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/frostyeti/cast/master/eng/scripts/install.ps1 | iex
```

By default, Cast installs under `~/.local/bin` on Linux and macOS and under `~/AppData/Local/Programs/bin` on Windows. Confirm it is on your `PATH`, then:

```bash
cast --help
```

## A minimal `castfile` and running tasks

Create a file named **`castfile`** in your project root (no extension):

```yaml
name: demo
tasks:
  hello:
    uses: shell
    run: echo "hello"
```

Run:

```bash
cast list
cast hello
cast run hello
```

`uses: shell` is the generic “defer to the system shell” path. For real projects you usually pick a **specific runner** so behavior is predictable on CI and on developer laptops.

## `uses:` runners: bash, PowerShell, Bun, Deno, Ruby

Cast maps **`uses:`** to a runner executable. Common values include `bash`, `sh`, `shell`, `pwsh`, `powershell`, `node`, `deno`, `bun`, `python`, `ruby`, `go`, `docker`, `ssh`, and more (see the [task reference](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/task.md)).

### Bash and POSIX shells

Use **`bash`** or **`sh`** for scripts that should behave like real shell scripts (strict mode, pipes, heredocs):

```yaml
tasks:
  lint:
    uses: bash
    run: |
      set -euo pipefail
      npm run lint

  build-sh:
    uses: sh
    run: ./scripts/build.sh
```

### PowerShell (`pwsh`)

On Windows or anywhere **`pwsh`** is installed, you can run **inline PowerShell** (or a `.ps1` path) with `uses: pwsh`. The `powershell` alias is also recognized for the Windows PowerShell host when you need it.

```yaml
tasks:
  windows-script:
    uses: pwsh
    run: ./scripts/build.ps1

  inline-pwsh:
    uses: pwsh
    run: |
      Write-Host "hello from PowerShell Core"
      Get-Location
```

### Bun and Deno (including inline TypeScript)

**`bun`** and **`deno`** can run a **file** (`run: ./scripts/serve.ts`) or **inline** TypeScript/JavaScript in `run:` using a block scalar. That is handy for one-off automation without creating a file on disk.

```yaml
tasks:
  serve-bun:
    uses: bun
    run: ./scripts/serve.ts

  quick-bun:
    uses: bun
    run: |
      console.log("hello from bun");

  test-deno:
    uses: deno
    run: ./scripts/test.ts

  quick-deno:
    uses: deno
    run: |
      console.log("hello from deno");
```

You still need the matching runtime installed (or delivered via your environment, for example [mise](/blog/mise-for-go-and-bun/)).

### Ruby

**`ruby`** runs a `.rb` file or **inline** Ruby via `ruby -e` style execution when `run:` contains multiple lines or is not a single path ending in `.rb`:

```yaml
tasks:
  gem-list:
    uses: ruby
    run: ./scripts/list_gems.rb

  quick-ruby:
    uses: ruby
    run: |
      puts "hello from ruby"
      puts RUBY_VERSION
```

## SSH tasks and inventory

**`uses: ssh`** runs a remote script over SSH. You name **hosts** in the task (`hosts: [prod]`) and define those hosts under top-level **`inventory`** in the same `castfile` (or load extra inventories via `inventories:`). See the [inventory reference](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/inventory.md) and [SSH guide](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/guides/ssh-and-scp.md).

Example shape (replace addresses, users, and keys with yours):

```yaml
name: demo
inventory:
  defaults:
    ssh:
      user: deploy
      identity: ~/.ssh/id_ed25519
  hosts:
    prod:
      host: 10.0.0.10
      defaults: ssh
tasks:
  remote-uptime:
    uses: ssh
    hosts: [prod]
    run: |
      uptime
      df -h /
```

You can pass **`with.max-parallel`** for fan-out, use **Go templates** on `ssh` tasks (`template: gotmpl`), and combine with **`scp`** tasks for file sync. The [README SSH section](https://github.com/frostyeti/cast/blob/master/README.md#ssh-and-scp-task-targeting-and-concurrency) summarizes concurrency and host selection.

## Experimental: modules and remote task packages

Several features are **experimental**: they work and are documented, but formats and CLI details may still change. Plan for occasional churn if you adopt them early.

### Modules (`cast.module` and `imports`)

**Modules** are reusable YAML bundles that can export tasks, env, PATH tweaks, dotenv, and even inventory. The **`cast.module`** shape is described in the [module reference](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/module.md). At the project root, a **`castfile`** can **`imports:`** (or **`modules:`**, same meaning) other modules by Git URL or shorthand so their tasks merge into your project task map:

```yaml
imports:
  - github.com/acme/shared
  - from: github.com/acme/shared
    ns: shared
    tasks: [lint, test]
```

Module-level tasks follow the same naming rules as normal tasks. Treat this as **shared task libraries** for teams or for splitting a large `castfile` across repos.

### Remote tasks via `uses:` (GitHub, GitLab, URLs, spells)

You are not limited to local runners. A task can set **`uses:`** to a **remote reference**: GitHub (`gh:` / `github:`), GitLab, Azure DevOps, `cast:` / `task:` / `spell:` namespaces, full `https://` or `git@` clone URLs, optional **`@version`** (tags, semver families, branches, SHAs), and optional **subpaths** to a task file inside the repo. The [README “Remote tasks”](https://github.com/frostyeti/cast/blob/master/README.md#remote-tasks-uses-remote-refs) section is the canonical overview.

Highlights:

- **`trusted_sources`** on the `castfile` allowlists which remote patterns may run. If the list is non-empty, anything else is rejected (security for arbitrary `uses:`).
- **Refs** can be immutable (stable cache) or branch/`@head`-like (volatile cache). Use **`cast task install`**, **`cast task update`**, and **`cast task clear-cache`** to manage prefetched remote tasks.

Example remote task pointing at a path inside a tagged repo:

```yaml
trusted_sources:
  - github.com/your-org/*

tasks:
  lint:
    uses: gh:your-org/automation@v1.2.3/tasks/lint
```

### `cast.yaml` remote task packages (`cast.task`)

Separately from “a task whose `uses:` points at GitHub,” Cast defines a **`cast.yaml`** (or **`cast`**) document for a **remote task package**: named inputs, `runs` with `using`, `main`, Docker image, or composite steps. That format is **experimental**; see the [remote task reference](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/cast.md). Callers pass **`with:`** keys; those map to **`INPUT_*`** environment variables inside the package.

```yaml
name: format
description: Format source files
inputs:
  target:
    description: Target path
    required: true
runs:
  using: bash
  args: ["-lc"]
  main: ./main.sh
```

Use this when you want a **published, versioned task** with a clear input contract, not just a one-off script reference.

## Red Hat YAML and JSON schemas from the Cast repo

Cast ships **JSON Schema** files under [`schemas/`](https://github.com/frostyeti/cast/tree/master/schemas), including:

- `castfile.schema.json` (main project document)
- `cast.schema.json` (references the castfile schema)
- `cast.module.schema.json` (experimental module documents)
- `cast.spell.schema.json` (standalone spell / remote task shapes)

You can add extra **`yaml.schemas`** entries for globs you use (for example module files) once you pick a naming convention.

The upstream [`.vscode/settings.json`](https://github.com/frostyeti/cast/blob/master/.vscode/settings.json) maps **`castfile.schema.json`** to files named exactly **`castfile`**:

```json
{
  "yaml.schemas": {
    "./schemas/castfile.schema.json": "castfile"
  }
}
```

To match that in **your** repo:

1. Install the [**YAML** extension by Red Hat](https://marketplace.visualstudio.com/items?itemName=RedHat.vscode-yaml) in VS Code (or a compatible editor).
2. Copy the `schemas` directory from the Cast repo into your project (or submodule it).
3. Add **`yaml.schemas`** under **`.vscode/settings.json`** so `./schemas/castfile.schema.json` resolves from the workspace root.

Opening **`castfile`** then gives completion and diagnostics. If nothing appears, confirm the file name is **`castfile`** (no extension) and paths are correct. After the **voidbear-io** migration, refresh `schemas/` from the new default branch if needed.

## Where to go next

- **CLI and execution model:** [Cast README](https://github.com/frostyeti/cast/blob/master/README.md) (context suffix routing, `before`/`after` hooks, `with` inputs, remote `uses:`, `trusted_sources`, cache).
- **Task runners and examples:** [task.md](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/task.md) (Docker, `tmpl`, `cast` cross-project tasks, dotnet/csharp, and more).
- **Imports and modules:** [module.md](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/module.md), [castfile `imports`](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/castfile.md#imports--modules).
- **Remote task package YAML:** [cast.md (remote task)](https://github.com/frostyeti/cast/blob/master/docs/site/src/content/docs/reference/cast.md).

Cast is meant to keep “how we run this repo” in one place: a **`castfile`** you can lint in the editor and run the same way locally and in automation.
