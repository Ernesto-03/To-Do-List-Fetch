import React, { useState, useEffect } from "react";

export function ToDoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Ernesto-03", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/Ernesto-03",
					{
						method: "GET",

						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						return resp.json();
					})
					.then(data => setList(data))

					.catch(err => {});
			})

			.catch(err => {});
	}, []);

	const addTask = e => {
		if (e.key === "Enter" && inputValue !== "") {
			let newObject = { label: inputValue, done: false };
			let newList = list.concat(newObject);
			setInputValue("");

			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/Ernesto-03",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newList)
				}
			)
				.then(resp => {
					setList(newList);
				})
				.catch(error => {});
		}
	};

	const deleteTask = listIndex => {
		let tempList = [...list];
		let updateList = tempList.filter(
			(_task, taskIndex) => taskIndex != listIndex
		);

		const methods = ["PUT", "DELETE"];

		if (updateList.length > 0) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/Ernesto-03",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updateList)
				}
			)
				.then(resp => {
					setList(updateList);
				})
				.catch(error => {});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/Ernesto-03",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updateList)
				}
			)
				.then(resp => {
					setList(updateList);
				})
				.catch(error => {});
		}
	};

	const deleteAll = () => {
		let emptyList = [];

		fetch("https://assets.breatheco.de/apis/fake/todos/user/Ernesto-03", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(emptyList)
		})
			.then(resp => {
				setList(emptyList);
			})
			.catch(error => {});
	};

	return (
		<div className="container pt-3">
			<h1 className="text-center">To-Do List</h1>
			<card>
				<input
					type="text"
					className="form-control"
					onChange={e => setInputValue(e.target.value)}
					onKeyUp={addTask}
					value={inputValue}
					placeholder="Agregar tarea"
				/>
				<div>
					<ul className="list-group list-group-flush">
						{list.map((task, listIndex) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between"
									key={listIndex}>
									{task.label}
									<span onClick={() => deleteTask(listIndex)}>
										<i className="fas fa-times"></i>
									</span>
								</li>
							);
						})}
					</ul>
					<div className="card-footer bg-transparent d-flex justify-content-end pr-0">
						<button
							type="button"
							className="btn btn-outline-secondary btn-sm mr-2"
							onClick={() => deleteAll()}>
							Borrar Todo
						</button>
					</div>
				</div>
			</card>
		</div>
	);
}
