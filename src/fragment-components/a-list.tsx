import React, { useEffect, useState } from 'react';
import {
	ListItem,
	TextInput,
	OrderedList,
	Accordion,
	AccordionItem
} from 'carbon-components-react';
import { AComponent, ComponentInfo } from './a-component';
import { useFragment } from '../context';
import { css } from 'emotion';
import {
	getParentComponent,
	DraggableTileList,
	Adder
} from '../components';
import image from './../assets/component-icons/radio.svg';
import {
	nameStringToVariableString,
	angularClassNamesFromComponentObj,
	reactClassNamesFromComponentObj
} from '../utils/fragment-tools';
import { FragmentLayoutWidget } from '../components/fragment-layout-widget';
import { flatten } from 'lodash';
import { arrayBuffer } from 'stream/consumers';

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
	// const addChildren = ((component: any, id: any) => {
	// 	return component.items.map((item: any) => {
	// 		if(item.id === component.id) {
	// 			debugger;
	// 			item.items.push({
	// 				itemText: 'new',
	// 				items: []
	// 			});
	// 		}

	// 		if (item.items && item.items.length)  {
	// 			item.items = addChildren(item, item.id)
	// 		}
	// 		return item
	// 	})
	// });
	// const template = (item: any, index: number) => {
	// 	return <>
	// 		<TextInput
	// 			light
	// 			value={item.itemText}
	// 			labelText='Label'
	// 			onChange={(event: any) => {
	// 				updateListItems('itemText', event.currentTarget.value, index);
	// 			}}
	// 		/>
	// 		<Adder
	// 			active={selectedComponent}
	// 			key={selectedComponent.id}
	// 			id={`add-${index}`}
	// 			bottomAction={() => addChildren(selectedComponent, index)}>
	// 		</Adder>
	// 	</>;
	// };
	const [isAccordionOpen, setIsAccordionOpen] = useState({} as any);

	useEffect(() => {
		setIsAccordionOpen({
			small: selectedComponent.smallSpan || selectedComponent.smallOffset,
			max: selectedComponent.maxSpan || selectedComponent.maxOffset
		});
	}, [selectedComponent]);
	return <>
			<Accordion align='start'>
				<AccordionItem
				title='Items list'
				className='layout-widget'
				open={isAccordionOpen.small}>
					<FragmentLayoutWidget fragment={fragment} setFragment={setComponent} />
				</AccordionItem>
			</Accordion>
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

export const AList = ({
	componentObj,
	selected,
	...rest
}: any) => {
	let flattenList: any[] = [];
	function bfs(array: any) {
		let queue = [array]; // the root node
		let nested = false;
		while(queue.length > 0) {
			let current = queue.shift(); // take the value at index 0 of the queue
			current.map((step: any, index: number) => {
					flattenList.push({id: step.id, value: step.itemText, level: step.codeContext.level});
			});
			for(const child of current) {
				nested = true;
				queue.push(child.items); // add the children of the current root node to the queue
			}
		}
	}
	bfs(componentObj.items);
	return (
			<AComponent
			selected={selected}
			headingCss={css`width: fit-content; min-width: 9rem;`}
			componentObj={componentObj}
			{...rest}>
				<OrderedList>
				{
					flattenList.map((step: any, index: number) => step.level > 1 ?
						<OrderedList nested>
							<ListItem>
								{step.value}
							</ListItem>
						</OrderedList> :
						<ListItem>
							{step.value}
						</ListItem>)
				}
				</OrderedList>
			</AComponent>
	);
};

export const componentInfo: ComponentInfo = {
	component: AList,
	settingsUI: AListSettingsUI,
	codeUI: AListCodeUI,
	keywords: ['list'],
	name: 'List',
	type: 'list',
	defaultComponentObj: {
		type: 'list',
		items: [
			{
				codeContext: {
					level: 1,
				},
				id: 'xas',
				value: 'list level 1',
				itemText: 'list level 1',
				items: [
					{
						codeContext: {
							level: 2
						},
						value: 'list level 2',
						itemText: 'list level 2',
						items: [
							{
								codeContext: {
									level: 3
								},
								value: 'list level 3',
								itemText: 'list level 3',
								items: []
							}
						]
					},
					{
						codeContext: {
							level: 2
						},
						value: 'item 2 list level 2',
						itemText: 'item 2 list level 2',
						items: []
					}

				]
			},
			{
				codeContext: {
					level: 1
				},
				value: 'Ordered list item 2 level 1',
				itemText: 'Ordered list item 2 level 1',
				items: [
					{
						codeContext: {
							level: 2
						},
						value: 'Ordered list level 2',
						itemText: 'Ordered list level 2',
						items: []
					}
				]
			},
			{
				codeContext: {
					level: 1
				},
				value:  'Ordered list item 3 level 1',
				itemText: 'Ordered list item 3 level 1',
				items: []
			}
		]
	},
	image: image,
	hideFromElementsPane: false,
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
