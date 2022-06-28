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
	const [fragment] = useFragment();
	const parentComponent = getParentComponent(fragment.data, selectedComponent);
	return <>
		<TextInput
				value={selectedComponent.itemText}
				labelText='Label'
				onChange={(event: any) => {
					setComponent({
						...selectedComponent,
						itemText: event.currentTarget.value
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

const addButtonStyle = css`
	position: relative;
`;

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
					value: componentObj.id,
					itemText: 'New level',
					children: []
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
		bottomAction={() => addListItem(1)}>
			<AComponent
			selected={selected}
			headingCss={css`width: fit-content; min-width: 9rem;`}
			componentObj={componentObj}
			{...rest}>
				<OrderedList>
					<ListItem
						className={css`margin-left: 30px;`}
						value={componentObj.value}
						id={componentObj.id}>
							{componentObj.itemText}
					</ListItem>
				</OrderedList>
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
		{componentObj.itemText}
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
