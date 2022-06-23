import React from 'react';
import {
	OrderedList,
	ListItem,
	TextInput,
	Checkbox
} from 'carbon-components-react';
import { css, cx } from 'emotion';
import { AComponent, ComponentInfo } from './a-component';
import image from './../assets/component-icons/button.svg';
import {
	angularClassNamesFromComponentObj,
	nameStringToVariableString,
	reactClassNamesFromComponentObj
} from '../utils/fragment-tools';
import { DraggableTileList } from '../components';

export const AOrderedListSettingsUI = ({ selectedComponent, setComponent }: any) => {
	const updateListItems = (key: string, value: any, index: number) => {
		const step = {
			...selectedComponent.items[index],
			[key]: value
		};

		setComponent({
			...selectedComponent,
			items: [
				...selectedComponent.items.slice(0, index),
				step,
				...selectedComponent.items.slice(index + 1)
			]
		});
	};

	const template = (item: any, index: number) => {
		return <>
			<TextInput
				light
				id={`itemText-${index}`}
				value={item.itemText}
				labelText='Label'
				onChange={(event: any) => {
					updateListItems('itemText', event.currentTarget.value, index);
				}}
			/>
			<Checkbox
				labelText='Nested'
				id={`nested-${index}`}
				onChange={(checked: boolean) => {
					updateListItems('nested', checked, index);
			}} />
		</>;
	};
	const updateStepList = (newList: any[]) => {
		setComponent({
			...selectedComponent,
			items: newList
		});
	};
	return <>
	<DraggableTileList
		dataList={[...selectedComponent.items]}
		setDataList={updateStepList}
		updateItem={updateListItems}
		defaultObject={{
			itemText: 'New list item',
		}}
		template={template} />
	</>;
};

export const AOrderedListCodeUI = ({ selectedComponent, setComponent }: any) => {
	return <>
		<TextInput
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
		/>
	</>
}

export const AOrderedList = ({
	children,
	componentObj,
	...rest
}: any) => {
	return (
		<AComponent
		componentObj={componentObj}
		{...rest}>
			 <OrderedList
			 	className={cx(css`margin-left: 30px;`, componentObj.cssClasses?.map((cc: any) => cc.id).join(' '))}>
				{
					componentObj.items.map((step: any, index: number) =>
					step.nested ? <OrderedList nested key={index}>
						<ListItem>
							{step.itemText}
						</ListItem>
					</OrderedList> :
					<ListItem
					key={index}>
						{step.itemText}
					</ListItem>)
				}
			</OrderedList>
		</AComponent>
	);
};

export const componentInfo: ComponentInfo = {
	component: AOrderedList,
	settingsUI: AOrderedListSettingsUI,
	codeUI: AOrderedListCodeUI,
	keywords: ['ordered, list'],
	name: 'Ordered list',
	type: 'ordered-list',
	defaultComponentObj: {
		type: 'ordered-list',
		kind: 'primary',
		items: [
			{
				level: 1,
				itemText: 'Item 1',
				nested: false
			}
		]
	},
	image,
	codeExport: {
		angular: {
			inputs: (_) => '',
			outputs: ({ json }) => ``,
			imports: [''],
			code: ({ json }) => {
				return ``;
			}
		},
		react: {
			imports: [''],
			code: ({ json }) => {
				return ``;
			}
		}
	}
};
