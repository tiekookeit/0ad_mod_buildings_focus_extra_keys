# Building focus hotkeys

GUI-only mod for 0 A.D. Release 28 (Boiorix). It adds configurable hotkeys to
select and focus the local player's main building of each supported type:

`Focus Civic Center`, `Focus Dock`, `Focus Barracks`, `Focus Corral`,
`Focus Blacksmith`, `Focus Arsenal`, `Focus Fortress`, `Focus Market`,
`Focus Stable`, `Focus Farmstead`, `Focus Outpost`, `Focus Wonder`,
`Focus Temple`, `Focus Storehouse`, `Focus House`, `Focus Siege Workshop`,
`Focus Gate`, and `Focus Defense Tower`.

## Install

Copy the `buildings_focus_extra_hotkeys` directory to:

```text
~/.local/share/0ad/mods/
```

Activate **Focus Civic Centre** in Settings → Mod Selection and restart the
game. Alternatively, launch with the normal mod options, for example:

```bash
0ad -mod=public -mod=buildings_focus_extra_hotkeys
```

The hotkeys can be assigned in the game's hotkey editor. They have no default
key binding. If the editor does not expose mod-defined actions, add entries
like this to the user configuration:

```ini
hotkey.session.focusciviccentre = "H"
hotkey.session.focusdock = "D"
```

The addon includes Brazilian Portuguese translations in
`l10n/pt_BR.buildings_focus_extra_hotkeys.po`. Other languages use the English
texts until a corresponding `<locale>.buildings_focus_extra_hotkeys.po` file
is added.

## Behaviour and limitations

During a game, each action enumerates entities owned by the local player,
accepts only completed entities of its structural class, and selects/focuses
the lowest entity ID as the main building of that type. If that building is
destroyed, the next lowest valid building is used. Foundations and observers
are ignored. No simulation command, entity mutation, or network command is
sent.

This checkout has no installed 0 A.D. executable, so loading and in-game
tests could not be run here. The files were checked against the Release 28
source layout and the JSON/XML/JavaScript syntax was validated statically.
