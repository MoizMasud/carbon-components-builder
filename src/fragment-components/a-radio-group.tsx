import React from 'react';
import { 
	Dropdown,
	TextInput,
	RadioButtonGroup
} from 'carbon-components-react';
import { AComponent, ComponentInfo } from './a-component';
import { ComponentCssClassSelector } from '../components/css-class-selector';
import image from './../assets/component-icons/radio-group.svg';
import {
	angularClassNamesFromComponentObj,
	nameStringToVariableString,
	reactClassNamesFromComponentObj
} from '../utils/fragment-tools';

export const ARadioButtonGroupStyleUI = ({ selectedComponent, setComponent }: any) => {
	const orientationItems = [
		{id: 'horizontal', text: 'Horizontal'},
		{id: 'vertical', text: 'Vertical'}
	];

	const labelPositions = [
		{id: 'left', text: 'Left'},
		{id: 'right', text: 'Right'}
	];

	return <>
		<TextInput
			value={selectedComponent.legend}
			labelText='Legend name'
			placeholder='Legend name'
			onChange={(event: any) => {
				setComponent({
					...selectedComponent,
					legend: event.currentTarget.value,
				});
			}}
		/>
		<Dropdown
			label='Orientation'
			titleText='Orientation'
			items={orientationItems}
			initialSelectedItem={orientationItems.find(item => item.id === selectedComponent.orientation)}
			itemToString={(item: any) => (item ? item.text : '')}
			onChange={(event: any) => setComponent({
				...selectedComponent,
				orientation: event.selectedItem.id
		})}/>
		<Dropdown
			label='Label position'
			titleText='Label position'
			items={labelPositions}
			initialSelectedItem={labelPositions.find(item => item.id === selectedComponent.labelPosition)}
			itemToString={(item: any) => (item ? item.text : '')}
			onChange={(event: any) => setComponent({
				...selectedComponent,
				labelPosition: event.selectedItem.id
		})}/>
		<ComponentCssClassSelector componentObj={selectedComponent} setComponent={setComponent} />
	</>
};

export const ARadioButtonGroupCodeUI = ({ selectedComponent, setComponent }: any) => {
	let allItems = selectedComponent.items.map((item: any) => {
		return {
			text: item.labelText,
			id: item.id,
			defaultChecked: item.defaultChecked
		}
	});
	allItems.push({text: 'None', id: 'none', defaultChecked: ''})
	selectedComponent.defaultSelected = `${selectedComponent.items.find(((item: any) => {
		return item.defaultChecked	
	}))?.id}`;
	
	return <>
		<Dropdown
			label='Default selection'
			titleText='Default selection'
			items={allItems}
			initialSelectedItem={allItems.find((item: any) => { 
				if(item.defaultChecked) {
					return item
				} else {
					return item.id === 'none'
				}
			})}
			itemToString={(item: any) => (item ? item.text : '')}
			onChange={(event: any) => setComponent({
				...selectedComponent,
				valueSelected:`${event.selectedItem.id}`,
				items: selectedComponent.items.map((item: any) => ({
						...item, 
						defaultChecked: event.selectedItem.id === item.id
				}))
		})}/>
	</>
};


export const ARadioButtonGroup = ({
	children,
	componentObj,
	...rest
}: any) => {
return (
		<AComponent
		componentObj={componentObj}
		{...rest}>
			<RadioButtonGroup
				className={componentObj.cssClasses?.map((cc: any) => cc.id).join(' ')}
				legendText= {componentObj.legend}
				disabled= {componentObj.disabled}
				orientation={componentObj.orientation}
				defaultSelected={componentObj.defaultSelected}
				labelPosition={componentObj.labelPosition}
				name={componentObj.codeContext?.name}>
					{children}
			</RadioButtonGroup>
		</AComponent>
	);
};

export const componentInfo: ComponentInfo = {
	component: ARadioButtonGroup,
	styleUI: ARadioButtonGroupStyleUI,
	codeUI: ARadioButtonGroupCodeUI,
	keywords: ['radio', 'button', 'group'],
	name: 'Radio buttons',
	defaultComponentObj: {
		disabled: false,
		type: 'radioGroup',
		legend: 'Radio Button Group',
		defaultSelected: '',
		labelPosition: 'right',
		orientation: 'horizontal',
		items: [
			{
				type: 'radio',
				labelText: "Option 1",
				disabled: false,
				defaultChecked: true,
			},
			{
				type: 'radio',
				labelText: "Option 2",
				disabled: false,
				defaultChecked: false,
			},
			{
				type: 'radio',
				labelText: "Option 3",
				disabled: false,
				defaultChecked: false,
			}
		]
	},
	render: ({ componentObj, select, remove, selected, renderComponents }) => <ARadioButtonGroup
		componentObj={componentObj}
		select={select}
		remove={remove}
		selected={selected}>
			{componentObj.items.map((button: any) => (renderComponents(button)))}
	</ARadioButtonGroup>,
	image,
	codeExport: {
		angular: {
			inputs: ({ json }) => `@Input() ${nameStringToVariableString(json.codeContext?.name)}LegendText = "${json.legend}";
								@Input() ${nameStringToVariableString(json.codeContext?.name)}Orientation = "${json.orientation}";
								@Input() ${nameStringToVariableString(json.codeContext?.name)}LabelPosition = "${json.labelPosition}";
								@Input() ${nameStringToVariableString(json.codeContext?.name)}Name = "${json.codeContext?.name}";
								@Input() ${nameStringToVariableString(json.codeContext?.name)}defaultSelected = "${json.defaultSelected}";`,
			outputs: ({ json }) => `@Output() ${nameStringToVariableString(json.codeContext?.name)}ValueChange = new EventEmitter();`,
			imports: ['RadioModule'],
			code: ({ json, jsonToTemplate }) => {
				return `<legend class="bx--label">{{${nameStringToVariableString(json.codeContext?.name)}LegendText}}</legend>
				<ibm-radio-group
					[name]="${nameStringToVariableString(json.codeContext?.name)}Name"
					[orientation]="${nameStringToVariableString(json.codeContext?.name)}Orientation"
					[labelPlacement]="${nameStringToVariableString(json.codeContext?.name)}LabelPosition"
					(change)="${nameStringToVariableString(json.codeContext?.name)}ValueChange.emit($event.value)"
					${angularClassNamesFromComponentObj(json)}>
						${json.items.map((element: any) => jsonToTemplate(element)).join('\n')}
				</ibm-radio-group>`
			}
		},
		react: {
			imports: ['RadioButtonGroup'],
			code: ({ json, fragments, jsonToTemplate }) => {
				return `
				<RadioButtonGroup
					name="${json.codeContext?.name}"
					legendText="${json.legend}"
					orientation="${json.orientation}"
					labelPlacement="${json.labelPosition}"
					defaultSelected="${json.defaultSelected}"
					valueChecked="${json.defaultSelected}"
					${reactClassNamesFromComponentObj(json)}
					onChange={(radio) => handleInputChange({
						target: {
							name: "${json.codeContext?.name}",
							value: radio
						}
					})}>
						${json.items.map((element: any) => jsonToTemplate(element, fragments)).join('\n')}
				</RadioButtonGroup>`;
			}
		}
	}
};
