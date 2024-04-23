import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "../DroppableComponent.module.css";
import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Step, StepLabel, Stepper, Typography } from "@mui/material";

const DroppableComponent = () => {
	const [DATA, setDATA] = React.useState({
		Alpha: [
			{ title: "23", id: "block_23", },
			{ title: "17", id: "block_17", },
			{ title: "35", id: "block_35", }
		],
		Beta: [
			{ title: "43", id: "block_43", },
			{ title: "59", id: "block_59", },
			{ title: "77", id: "block_77", }
		],
		Charlie: [
			{ title: "36", id: "block_36", },
			{ title: "91", id: "block_91", },
			{ title: "12", id: "block_12", }
		],
		Delta: [
			{ title: "79", id: "block_79", },
			{ title: "64", id: "block_64", },
			{ title: "28", id: "block_28", }
		]
	});
	const [isModalVisible, setIsModalVisible] = useState();

	const handleDragAndDrop = (result) => {
		if (!result.destination) return;

		const sourceId = result.source.droppableId;
		const destinationId = result.destination.droppableId;

		const sourceData = DATA[sourceId];
		const destinationData = DATA[destinationId];

		if (!sourceData || !destinationData) return;

		const [movedItem] = sourceData.splice(result.source.index, 1);

		if (Array.isArray(destinationData)) {
			if (destinationId !== 'Delta' && destinationData.length > 3) {
				alert('Maximum 4 Blocks Allowed')
				sourceData.splice(result.source.index, 0, movedItem);
				return;
			}

			if (destinationId === "Beta" && parseInt(movedItem.title) % 2 === 0) {
				alert("Beta lane only accepts blocks with odd-numbered titles.");
				sourceData.splice(result.source.index, 0, movedItem);
				return;
			}

			if (destinationId === "Charlie" || sourceId === 'Charlie') {
				const data = destinationId === 'Charlie' ? destinationData : sourceData;
				const sum = data.reduce((acc, curr) => acc + parseInt(curr.title), 0);
				if (sum <= 100) {
					alert("Sum of Blocks in Charlie lane must be greater than 100.");
					sourceData.splice(result.source.index, 0, movedItem);
					return;
				}
			}

			destinationData.splice(result.destination.index, 0, movedItem);

			movedItem.history = movedItem.history || [];
			movedItem.history.push(destinationId);

			setDATA({
				...DATA,
				[sourceId]: [...sourceData],
				[destinationId]: [...destinationData],
			});
		}
	};

	const setModalVisible = (blockDetail) => {
		setIsModalVisible(blockDetail.history || [])
	}

	return (
		<>
			<Typography textAlign={'center'} fontSize={22} fontWeight={'bold'}>SWIMLANE TASK</Typography>
			<DragDropContext onDragEnd={handleDragAndDrop}>
				<div className={styles.mainContainer}>
					{Object.keys(DATA).map((droppableId, index) => (
						<div key={index} className={styles.subContainer}>
							<div className={styles.verticalText}>
								{droppableId}
							</div>
							<Droppable droppableId={droppableId} direction="horizontal">
								{(provided) => (
									<div
										className={styles.items}
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{DATA[droppableId].map((item, index) => (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(provided) => (
													<div
														{...provided.dragHandleProps}
														{...provided.draggableProps}
														ref={provided.innerRef}
														className={styles.itemContainer}
														onClick={() => setModalVisible(item)}
													>
														<div className={styles.innerContainer}>
															{item.title}
														</div>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					))}
				</div>
			</DragDropContext>
			{isModalVisible && (
				<Dialog
					open={isModalVisible}
					onClose={() => setIsModalVisible(false)}
					fullWidth
					maxWidth='sm'
					PaperProps={{
						style: {
							height: '50vh',
						}
					}}
				>
					<DialogTitle>
						<Typography fontSize={22} fontWeight={'600'}>Block Transition History</Typography>
					</DialogTitle>
					<DialogContent>
						<Box px={5}>
							{isModalVisible.length ? (
								<Stepper orientation="vertical">
									{isModalVisible.map((step, index) => (
										<Step key={step.label}>
											<StepLabel>
												{step}
											</StepLabel>
										</Step>
									))}
								</Stepper>
							) : <Typography>No Transitions Found for this Block</Typography>}
						</Box>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" onClick={() => setIsModalVisible(false)}>Close</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	);
};

export default DroppableComponent;