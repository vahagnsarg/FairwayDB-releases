# FairwayDB

  A fast, local desktop client for PostgreSQL, built for people who live in their
  database all day. Browse schemas, filter and edit rows without writing SQL, run
  queries with history, walk foreign keys visually, and ask an AI assistant that
  can actually look at your schema — all in a dark-first UI that stays out of the
  way.

  **[Download the latest release](https://github.com/vahagnsarg/FairwayDB-releases/releases/latest)** ·
  [Website](https://vahagnsarg.github.io/FairwayDB-releases/) ·
  [Feature tour](https://vahagnsarg.github.io/FairwayDB-releases/features.html) ·
  [Report a problem](https://github.com/vahagnsarg/FairwayDB-releases/issues)

  This repository holds FairwayDB's installers and website. The source code is
  developed privately.

  ## Download

  | Platform                  | File                                  |
  | ------------------------- | ------------------------------------- |
  | macOS — Apple Silicon     | `FairwayDB-<version>-mac-arm64.dmg`   |
  | macOS — Intel             | `FairwayDB-<version>-mac-x64.dmg`     |
  | Windows (64-bit)          | `FairwayDB-<version>-win-x64.exe`     |
  | Linux (x86-64)            | `FairwayDB-<version>-linux-x86_64.AppImage`, or the `.tar.gz` |

  All of them are on the [latest release](https://github.com/vahagnsarg/FairwayDB-releases/releases/latest).
  Not sure which Mac you have? Apple menu → **About This Mac**: "Apple M…" is Apple
  Silicon, "Intel" is Intel.

  ## Installing

  FairwayDB is not code-signed yet, so macOS and Windows ask you to confirm the
  first launch. This is expected, and you only do it once.

  ### macOS

  1. Open the `.dmg` and drag **FairwayDB** into **Applications**.
  2. Open it. macOS says *"Apple could not verify 'FairwayDB' is free of malware"* —
     click **Done** (not *Move to Bin*).
  3. Open **System Settings → Privacy & Security**, scroll to **Security**, and click
     **Open Anyway** next to *"FairwayDB" was blocked*. Enter your password, then
     click **Open**.
  4. If macOS asks whether FairwayDB may use your keychain, click **Always Allow** —
     that is where it keeps the key that encrypts your saved passwords.

  Until the app is signed, macOS asks step 4 again after each new version, and
  updates are installed by downloading the new `.dmg`.

  ### Windows

  1. Run the `.exe`.
  2. If SmartScreen shows *"Windows protected your PC"*, click **More info →
     Run anyway**.
  3. Choose where to install it; it installs for your user only, without admin rights.

  ### Linux

  ```bash
  chmod +x FairwayDB-*-linux-x86_64.AppImage
  ./FairwayDB-*-linux-x86_64.AppImage
  ```

  Or unpack the `.tar.gz` and run `fairwaydb` from inside it. The AppImage is the
  one that updates itself.

  ## Updates

  On Windows and Linux (AppImage) FairwayDB checks this repository for a new
  version shortly after launch and every few hours, downloads it in the
  background, and asks you to restart when it is ready — or installs it the next
  time you quit. **Help → Check for Updates…** checks right away, and **Help →
  Check for Updates Automatically** turns the background check off.

  macOS joins in once the app is signed; until then, download the new `.dmg` from
  [Releases](https://github.com/vahagnsarg/FairwayDB-releases/releases).

  ## Highlights


  - **Connections** — saved and recent connections with colour tags; test before
    saving; paste a `postgres://` URL; TLS with certificate verification; mark a
    connection read-only and the database itself refuses writes.
  - **Schema browser** — tables and views with row estimates, pinned tables in your
    own categories, a `/regex/` filter, and a one-click SQL dump of a schema.
  - **Table view** — filter without writing SQL, search every column at once, edit
    rows and apply them in one transaction, a JSON panel for `jsonb`, foreign-key
    jumps, and export to CSV, JSON or SQL.
  - **SQL editor** — schema-aware autocomplete, formatting, run history, saved
    queries, a result per statement, and a Stop button.
  - **Structure, ERD and related rows** — DDL, indexes and keys; an entity diagram
    for a whole schema; and every row linked to the one you start from.
  - **Everywhere** — a ⌘K command palette, keyboard shortcuts for everything,
    several windows, and portable workspaces you can move to another database.
  - **AI assistant** — bring your own Anthropic API key. It can read your schema and
    run read-only queries, and every tool call it makes is shown.

  ## Your data

  - FairwayDB runs entirely on your computer. Connections go straight from the app
    to your database.
  - Saved passwords and your API key are encrypted with a key held by your
    operating system's keychain.
  - The only other network traffic is the optional AI assistant, which talks to
    Anthropic with your key, and the update check against this repository, which
    you can turn off.

  Your settings are stored in:

  | Platform | Location                                        |
  | -------- | ----------------------------------------------- |
  | macOS    | `~/Library/Application Support/FairwayDB/data`  |
  | Windows  | `%APPDATA%\FairwayDB\data`                      |
  | Linux    | `~/.config/FairwayDB/data`                      |

  ## Requirements

  - macOS 12 (Monterey) or later, Windows 10 or later, or a 64-bit Linux desktop.
  - PostgreSQL to connect to.

  ## Problems and ideas

  [Open an issue](https://github.com/vahagnsarg/FairwayDB-releases/issues). For a
  crash or an error, **Help → Open Logs Folder** shows the app's log — attaching
  `fairwaydb.log` helps a lot.

  ## License

  [MIT](LICENSE) © 2026 Vahagn Sargsyan
