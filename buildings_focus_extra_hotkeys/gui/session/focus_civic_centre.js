/**
 * Building focus hotkeys - Release 28 (Boiorix)
 * GUI-only feature: selection and camera movement are local operations.
 */

const focusBuildings_DEBUG = true;
// input.js defines INVALID_ENTITY, but session scripts are loaded by directory
// and this file may be evaluated before input.js. Keep a private sentinel.
const focusBuildings_INVALID_ENTITY = 0;
const focusBuildings_mainEntities = {};

function focusBuildings_log(message)
{
	if (focusBuildings_DEBUG)
		warn("[buildings_focus_extra_hotkeys] " + message);
}

function focusBuildings_ownedEntities()
{
	const playerID = Engine.GetPlayerID();
	if (playerID < 1 || g_IsObserver)
		return [];

	// GetPlayerEntities is the Release 28 GUI-interface call. The local player
	// is supplied by the engine as the implicit first ScriptCall argument.
	return Engine.GuiInterfaceCall("GetPlayerEntities") || [];
}

function focusBuildings_hasClass(state, className)
{
	const classes = state && state.identity && state.identity.classes;
	return Array.isArray(classes) && classes.indexOf(className) != -1;
}

function focusBuildings_isCompleted(state, playerID, className)
{
	return !!state && state.player == playerID && !state.foundation &&
		focusBuildings_hasClass(state, className) && !!state.position;
}

function focusBuildings_getOwned(className)
{
	const playerID = Engine.GetPlayerID();
	return focusBuildings_ownedEntities().filter(entityID =>
		focusBuildings_isCompleted(GetEntityState(entityID), playerID, className));
}

function focusBuildings_resolveMain(className)
{
	const buildings = focusBuildings_getOwned(className).sort((a, b) => a - b);
	if (!buildings.length)
	{
		focusBuildings_mainEntities[className] = focusBuildings_INVALID_ENTITY;
		return focusBuildings_INVALID_ENTITY;
	}

	const mainEntity = focusBuildings_mainEntities[className] || focusBuildings_INVALID_ENTITY;
	if (buildings.indexOf(mainEntity) != -1)
		return mainEntity;

	// Entity IDs are monotonic in normal games, making the first completed
	// building the best available fallback when the original one was destroyed.
	focusBuildings_mainEntities[className] = buildings[0];
	return buildings[0];
}

function focusBuildings_onHotkey(className)
{
	if (g_IsObserver || Engine.GetPlayerID() < 1)
	{
		focusBuildings_log("This action requires a local player.");
		return;
	}

	const entityID = focusBuildings_resolveMain(className);
	if (entityID == focusBuildings_INVALID_ENTITY)
	{
		focusBuildings_log("No " + className + " available.");
		return;
	}

	// This is the same GUI helper used by the game's existing focus actions.
	g_Selection.selectAndMoveTo(entityID);
}

function focusCivicCentre_onHotkey() { focusBuildings_onHotkey("CivCentre"); }
function focusDock_onHotkey() { focusBuildings_onHotkey("Dock"); }
function focusBarracks_onHotkey() { focusBuildings_onHotkey("Barracks"); }
function focusCorral_onHotkey() { focusBuildings_onHotkey("Corral"); }
function focusBlacksmith_onHotkey() { focusBuildings_onHotkey("Blacksmith"); }
function focusArsenal_onHotkey() { focusBuildings_onHotkey("Arsenal"); }
function focusFortress_onHotkey() { focusBuildings_onHotkey("Fortress"); }
function focusMarket_onHotkey() { focusBuildings_onHotkey("Market"); }
function focusStable_onHotkey() { focusBuildings_onHotkey("Stable"); }
function focusFarmstead_onHotkey() { focusBuildings_onHotkey("Farmstead"); }
function focusOutpost_onHotkey() { focusBuildings_onHotkey("Outpost"); }
function focusWonder_onHotkey() { focusBuildings_onHotkey("Wonder"); }
function focusTemple_onHotkey() { focusBuildings_onHotkey("Temple"); }
function focusStorehouse_onHotkey() { focusBuildings_onHotkey("Storehouse"); }
function focusHouse_onHotkey() { focusBuildings_onHotkey("House"); }
function focusSiegeWorkshop_onHotkey() { focusBuildings_onHotkey("SiegeWorkshop"); }
function focusGate_onHotkey() { focusBuildings_onHotkey("Gate"); }
function focusDefenseTower_onHotkey() { focusBuildings_onHotkey("DefenseTower"); }
