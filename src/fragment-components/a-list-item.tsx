import React from 'react';
import {
	OrderedList,
	TextInput,
	ListItem
} from 'carbon-components-react';
import { AComponent, ComponentInfo } from './a-component';
import { useFragment } from '../context';
import { css } from 'emotion';
import {
	getParentComponent,
	updatedState,
	Adder
} from '../components';
import {
	nameStringToVariableString,
	angularClassNamesFromComponentObj,
	reactClassNamesFromComponentObj
} from '../utils/fragment-tools';

export const AListItemSettingsUI = ({ selectedComponent, setComponent }: any) => {
	return <>
		<TextInput
				value={selectedComponent.value}
				labelText='Label'
				onChange={(event: any) => {
					setComponent({
						...selectedComponent,
						value: event.currentTarget.value
					})}}
			/>
	</>;
};

export const AListItemCodeUI = ({ selectedComponent, setComponent }: any) => {
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

export const AListItem = ({
	componentObj,
	selected,
	...rest
}: any) => {
	const [fragment, setFragment] = useFragment();
	const parentComponent = getParentComponent(fragment.data, componentObj);
	const addListItem = (offset = 0) => setFragment({
		...fragment,
		data: updatedState(
			fragment.data,
			{
				type: 'insert',
				component: {
					type: 'listItem',
					value: 'New Item',
					items: []
				}
			},
			parentComponent.id,
			parentComponent.items.indexOf(componentObj) + offset
		)
	});
	function nested(step: any, child = false) {
		if(!step.items) {
			return;
		}
		return <OrderedList nested={child}>
				<ListItem className={css`cursor:pointer`}>
					{step.value}
					{step.items.length > 0 ? step.items.map((item: any) =>  nested(item, true)) : []}
				</ListItem>
		</OrderedList>
	}
	return (
		<Adder
		active={selected}
		key={componentObj.id}
		bottomAction={() => addListItem(1)}>
			<AComponent
			selected={selected}
			headingCss={css`width: fit-content; min-width: 9rem;`}
			componentObj={componentObj}
			{...rest}>
				{
					<ListItem className={css`cursor:pointer`}>
						{componentObj.value}
						{componentObj.items.length > 0 ? componentObj.items.map((step: any) => nested(step, true)) : []}
					</ListItem>
				}
			</AComponent>
		</Adder>
	);
};

export const componentInfo: ComponentInfo = {
	component: AListItem,
	settingsUI: AListItemSettingsUI,
	codeUI: AListItemCodeUI,
	render: ({ componentObj, select, remove, selected }) => <AListItem
	componentObj={componentObj}
	select={select}
	remove={remove}
	selected={selected}>
		{componentObj.value}
	</AListItem>,
	keywords: ['list', 'item'],
	name: 'List item',
	type: 'listItem',
	defaultComponentObj: {
		type: 'listItem'
	},
	image: undefined,
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
