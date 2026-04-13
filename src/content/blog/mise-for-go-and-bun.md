---
title: "Mise for personal projects: Go and Bun"
description: "Install mise, pin tool versions per repo, and run Go or Bun without juggling installers."
pubDate: 2026-02-08
---

Side projects accumulate languages. One repo wants **Go**, another **Bun**, and you do not want five different “install this SDK” tutorials bookmarked. [**mise**](https://mise.jdx.dev/) (formerly rtx) is a single CLI that installs and switches **tool versions**. Mise is perfect for hobby repos where you still want reproducible builds or getting co-workers up and running fast at work.

This is not a full mise manual; it is a **minimal path** for personal Go and Bun work. See the official [Getting started](https://mise.jdx.dev/getting-started.html) guide if you want something more in depth.

## Install the CLI

On macOS or Linux, the quick path is:

```bash
curl https://mise.run | sh
```

By default binaries land under `~/.local/bin`. Check that it works:

```bash
~/.local/bin/mise --version
```

After you [activate mise in your shell](https://mise.jdx.dev/getting-started.html#activate-mise) (for example, adding `eval "$(~/.local/bin/mise activate zsh)"` to `~/.zshrc`), `mise` is on your `PATH` in interactive sessions. For one-off commands without activation, you can still call `~/.local/bin/mise` explicitly.

### Windows: Chocolatey, shells, and limits

On Windows you can install mise with [Chocolatey](https://community.chocolatey.org/packages/mise) from an elevated prompt:

```powershell
choco install mise -y
```

Then confirm:

```powershell
mise --version
```

Treat Windows as a **second-class** target compared to macOS or Linux. mise is **most reliable in [PowerShell Core](https://github.com/PowerShell/PowerShell)** (`pwsh`): activation, `PATH` updates, and day-to-day use line up with what the docs and community expect. **Windows PowerShell** (5.x) and **Git Bash** often give you a harder time: odd environment inheritance, incomplete activation support, or behavior that does not match Unix shells. If you rely on mise on Windows, standardize on **PowerShell Core** for your dev terminal and keep Git Bash or classic PowerShell for tasks that do not touch mise.

See [Installing mise](https://mise.jdx.dev/installing-mise.html) for winget, Scoop, and other options if you do not use Chocolatey.

## Pin Go and Bun in a project

In a repo root, create or edit **`mise.toml`** so the directory always uses the same tool versions:

```toml
[tools]
go = "1.23.6"
bun = "1.2"
```

Run **`mise install`** (or open a new shell with mise activated) so those versions are fetched. If mise asks you to **trust** the file the first time you run tasks or load env from it, run **`mise trust`** in that directory. Config files can run hooks, so the prompt is intentional.

For a single machine default (everything in your home directory uses the same Go unless a project overrides it), you can set globals:

```bash
mise use --global go@1.23.6
mise use --global bun@1.2
```

Project `mise.toml` still wins inside that folder, which is what you want for side work: **global comfort, per-repo precision**.

## Run commands with the pinned tools

With activation, `go` and `bun` resolve to the versions from `mise.toml`. If you prefer not to activate, **`mise exec`** runs a command with the right environment:

```bash
mise exec -- go version
mise exec -- bun --version
```

Use that in CI or scripts so the same versions apply everywhere.

Typical project flows:

- **Go:** `mise exec -- go mod tidy` and `mise exec -- go test ./...`
- **Bun:** `mise exec -- bun install` and `mise exec -- bun run dev`

When you bump a version, edit `mise.toml`, run `mise install`, and commit the file. Anyone else (including future you) gets the same toolchain.

## Confirm paths with `mise which`

When something feels “wrong binary,” **`mise which`** prints the exact path mise will use for a tool, which is handy when you have system installs, old shims, or multiple versions on disk.

From a directory with your `mise.toml` loaded (shell activated, or after `cd` into the project):

```bash
mise which go
# e.g. ~/.local/share/mise/installs/go/1.23.6/bin/go

mise which bun
# e.g. ~/.local/share/mise/installs/bun/1.2.0/bin/bun
```

If you pass a command name that is not a managed tool, mise may say it cannot resolve it. Stick to the tool IDs you listed under `[tools]` (here, `go` and `bun`). Comparing `which go` vs `mise which go` after activation is a quick sanity check that your shell is not picking up `/usr/bin/go` from the OS instead of the pinned version.

The `mise which` command is useful in CI/CD pipelines that support logging commands that enabling prependPath between steps/tasks like Github actions or Azure DevOps.

```bash
bunDir="$(mise which bun)"
bunDir="$(dirname $bunDir)"
echo "##vso[task.prependpath]$bunDir"
```

```bash
bunDir="$(mise which bun)"
bunDir="$(dirname $bunDir)"
echo "$bunDir" >> "$GITHUB_PATH"
```

## VS Code

Install the [**Mise VS Code** extension](https://marketplace.visualstudio.com/items?itemName=hverlin.mise-vscode) from the Marketplace. It adds `mise.toml` editing support, task running from the editor, and wiring so other extensions tend to pick up mise-managed tool paths. Documentation and tutorials live on the [mise-vscode site](https://hverlin.github.io/mise-vscode/).


## Why bother for “just” personal repos?

- **One mental model** instead of remembering whether you installed Go via a package manager, a tarball, or something else.
- **Explicit versions** in git, which matters the day a standard library or runtime change bites you.
- **Room to grow**: mise also handles [tasks](https://mise.jdx.dev/tasks/) and env vars in the same config if your projects later need them.

For deeper setup (backends, shims vs `activate`, trust policies), start at [Getting started](https://mise.jdx.dev/getting-started.html) and follow the links from there. For Go and Bun specifically, treat `mise.toml` as the contract: if it builds with those pins, you are done.
