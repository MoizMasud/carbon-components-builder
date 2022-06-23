// Accordion
import * as accordion from './accordion/a-accordion';
import * as accordionitem from './accordion/a-accordion-item';
import * as button from './a-button';
import * as checkbox from './a-checkbox';
import * as column from './a-column';
import * as combobox from './a-combobox';
import * as dropdown from './a-dropdown';
import * as fragment from './a-fragment';
import * as grid from './a-grid';
import * as numberinput from './a-numberinput';
import * as radio from './a-radio';
import * as radioGroup from './a-radio-group';
import * as progressIndicator from './a-progress-indicator';
import * as row from './a-row';
import * as tag from './a-tag';
import * as searchinput from './a-searchinput';
import * as text from './a-text';
import * as textarea from './a-textarea';
import * as textinput from './a-textinput';
import * as link from './a-link';
import * as list from './a-list';
import * as orderedList from './a-ordered-list';
import * as overflowMenu from './a-overflow-menu';
// Tiles
import * as tile from './tiles/a-tile';
import * as clickabletile from './tiles/a-clickable-tile';
import * as expandabletile from './tiles/a-expandable-tile';
import * as tilefold from './tiles/a-tile-fold';
import * as selectabletile from './tiles/a-selectable-tile';
import * as selectableTileGroup from './tiles/a-selectable-tile-group';
import * as radiotile from './tiles/a-radio-tile';
import * as radioTileGroup from './tiles/a-radio-tile-group';

// Accordion
export { AAccordion, AAccordionSettingsUI } from './accordion/a-accordion';
export { AAccordionItem, AAccordionItemSettingsUI } from './accordion/a-accordion-item';
export { AButton, AButtonSettingsUI } from './a-button';
export { ACheckbox, ACheckboxSettingsUI, ACheckboxCodeUI } from './a-checkbox';
export { AColumn, AColumnSettingsUI } from './a-column';
export { AComboBox, AComboBoxSettingsUI, AComboBoxCodeUI } from './a-combobox';
export { ADropdown, ADropdownSettingsUI, ADropdownCodeUI } from './a-dropdown';
export * from './a-component';
export { AFragment, AFragmentSettingsUI, AFragmentCodeUI } from './a-fragment';
export { AGrid, AGridSettingsUI } from './a-grid';
export { ALink, ALinkSettingsUI, ALinkCodeUI } from './a-link';
export { AList, AListSettingsUI, AListCodeUI } from './a-list';
export { AOrderedList, AOrderedListSettingsUI, AOrderedListCodeUI } from './a-ordered-list';
export { ANumberInput, ANumberInputSettingsUI, ANumberInputCodeUI } from './a-numberinput';
export { AProgressIndicator, AProgressIndicatorSettingsUI, AProgressIndicatorCodeUI } from './a-progress-indicator';
export { ARow, ARowSettingsUI } from './a-row';
export { ASearchInput, ASearchInputSettingsUI, ASearchInputCodeUI } from './a-searchinput';
export { ATag, ATagSettingsUI } from './a-tag';
export { AText, ATextSettingsUI } from './a-text';
export { ATextArea, ATextAreaSettingsUI, ATextAreaCodeUI } from './a-textarea';
export { ATextInput, ATextInputSettingsUI, ATextInputCodeUI } from './a-textinput';
export { AOverflowMenu, AOverflowMenuCodeUI, AOverflowMenuSettingsUI } from './a-overflow-menu';
export { ARadio, ARadioSettingsUI, ARadioCodeUI } from './a-radio';
export { ARadioGroup, ARadioGroupSettingsUI, ARadioGroupCodeUI } from './a-radio-group';

// Tiles
export { ATile, ATileCodeUI, ATileSettingsUI } from './tiles/a-tile';
export { AClickableTile, AClickableTileCodeUI, AClickableTileSettingsUI } from './tiles/a-clickable-tile';
export { AExpandableTile, AExpandableTileCodeUI, AExpandableSettingsUI } from './tiles/a-expandable-tile';
export { ATileFold, ATileFoldSettingsUI } from './tiles/a-tile-fold';
export { ASelectableTile, ASelectableTileCodeUI, ASelectableTileSettingsUI } from './tiles/a-selectable-tile';
export { ASelectableTileGroup, ASelectableTileGroupCodeUI, ASelectableTileGroupSettingsUI } from './tiles/a-selectable-tile-group';
export { ARadioTile, ARadioTileCodeUI, ARadioTileSettingsUI } from './tiles/a-radio-tile';
export { ARadioTileGroup, ARadioTileGroupCodeUI, ARadioTileGroupSettingsUI } from './tiles/a-radio-tile-group';

export const allComponents = {
	accordion,
	accordionitem,
	button,
	checkbox,
	combobox,
	column,
	dropdown,
	fragment,
	grid,
	radio,
	radioGroup,
	link,
	list,
	orderedList,
	numberinput,
	progressIndicator,
	row,
	searchinput,
	tag,
	text,
	textarea,
	textinput,
	overflowMenu,
	// Tiles
	tile,
	clickabletile,
	expandabletile,
	tilefold,
	selectabletile,
	selectableTileGroup,
	radiotile,
	radioTileGroup
};
