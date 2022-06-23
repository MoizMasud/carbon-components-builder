import React from 'react';
import {
	ListItem,
	TextInput
} from 'carbon-components-react';
import { AComponent, ComponentInfo } from './a-component';
import { useFragment } from '../context';
import { css } from 'emotion';
import {
	getParentComponent,
	updatedState,
	Adder,
	DraggableTileList
} from '../components';
import image from './../assets/component-icons/radio.svg';
import {
	nameStringToVariableString,
	angularClassNamesFromComponentObj,
	reactClassNamesFromComponentObj
} from '../utils/fragment-tools';

export const AListSettingsUI = ({ selectedComponent, setComponent }: any) => {
	const [fragment] = useFragment();
	const parentComponent = getParentComponent(fragment.data, selectedComponent);
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
	}
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
			itemText: 'new level',
		}}/>
	<TextInput
		value={selectedComponent.itemText || ''}
		labelText='Label'
		placeholder='Item value'
		onChange={(event: any) => {
			setComponent({
				...selectedComponent,
				itemText: event.currentTarget.value
			});
		}}
	/>
	</>;
};

export const AListCodeUI = ({ selectedComponent, setComponent }: any) => {
	return <TextInput
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

const addButtonStyle = css`
	position: relative;
`;

export const AList = ({
	componentObj,
	selected,
	...rest
}: any) => {
	const [fragment, setFragment] = useFragment();
	const parentComponent = getParentComponent(fragment.data, componentObj);

	const addList = (offset = 0) => setFragment({
		...fragment,
		data: updatedState(
			fragment.data,
			{
				type: 'insert',
				component: {
					type: 'list',
					value: componentObj.id,
					itemText: 'New item',
				}
			},
			parentComponent.id,
			parentComponent.items.indexOf(componentObj) + offset
		)
	});
	return (
		<Adder
		active={selected}
		addButtonsCss={addButtonStyle}
		key={componentObj.id}
		bottomAction={() => addList(1)}>
			<AComponent
			selected={selected}
			headingCss={css`width: fit-content; min-width: 9rem;`}
			componentObj={componentObj}
			{...rest}>
				<ListItem
					value={componentObj.value}
					id={componentObj.id}>
						{componentObj.itemText}
				</ListItem>
			</AComponent>
		</Adder>
	);
};

export const componentInfo: ComponentInfo = {
	component: AList,
	settingsUI: AListSettingsUI,
	codeUI: AListCodeUI,
	render: ({ componentObj, select, remove, selected }) => <AList
	componentObj={componentObj}
	select={select}
	remove={remove}
	selected={selected}>
		{componentObj.itemText}
	</AList>,
	keywords: ['list'],
	name: 'list',
	type: 'list',
	defaultComponentObj: {
		type: 'list',
		items: []
	},
	image: image,
	hideFromElementsPane: true,
	codeExport: {
		angular: {
			inputs: ({ json }) => ``,
			outputs: ({ json }) => ``,
			imports: [],
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
