import React, { useRef } from 'react';
import { TextInput, Tab, Tile } from 'carbon-components-react';
import { AComponent, ComponentInfo } from '../a-component';
import image from '../../assets/component-icons/link.svg';
import { APlaceholder } from '../a-placeholder';

export const ATabSettingsUI = () => { return <></>};

export const ATabCodeUI = ({ selectedComponent, setComponent }: any) => {
	return <TextInput
			id='input-name'
			value={selectedComponent.codeContext?.name}
			labelText='Input name'
			onChange={(event: any) => {
				setComponent({
					...selectedComponent,
					codeContext: {
						...selectedComponent.codeContext,
						name: event.currentTarget.value
					}
				});
			}}
		/>;
};

export const ATab = ({
	componentObj,
	onDrop,
	onDragOver,
	children,
	selected,
	outline,
	...rest
}: any) => {
	return (
		<AComponent
		componentObj={componentObj}
		selected={selected}
		{...rest}>
			<Tab
			onDragOver={onDragOver}
			label={componentObj.labelText}
			disabled={componentObj.disabled}>
				{children}
			</Tab>
		</AComponent>
	);
};

export const componentInfo: ComponentInfo = {
	component: ATab,
	settingsUI: ATabSettingsUI,
	codeUI: ATabCodeUI,
	render: ({ componentObj, select, remove, selected, renderComponents, onDragOver, onDrop, outline }) => <ATab
	componentObj={componentObj}
	disabled={componentObj.disabled}
	label={componentObj.labelText}
	select={select}
	remove={remove}
	onDragOver={onDragOver}
	onDrop={onDrop}
	selected={selected}>
		{componentObj.items?.map((tab: any) => renderComponents(tab, outline))}
	</ATab>,
	keywords: ['tab'],
	name: 'Tab',
	type: 'tab',
	defaultComponentObj: {
		type: 'tab',
		items: []
	},
	image,
	hideFromElementsPane: true,
	codeExport: {
		angular: {
			inputs: () => '',
			outputs: () => '',
			imports: [''],
			code: () => {
				return '';
			}
		},
		react: {
			imports: [''],
			code: () => {
				return '';
			}
		}
	}
};

