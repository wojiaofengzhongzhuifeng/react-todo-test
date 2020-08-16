import React from 'react';
import { Input, Button, Modal, Tabs} from 'antd';
import "./App.css"

const { Search } = Input;
const { TabPane } = Tabs;


class App extends React.Component{
	constructor() {
		super();
		this.state = {
			visible: false,
			editVisible:false,
			inputValue: '',
			todoList: [],
			editInputValue: '',
			wantToEditInputValue: '',
		}
	}
	render(){
		return (
			<div className="App">
				<div className="search-add-todo">
					<Search
						placeholder="input search text"
						onSearch={value => console.log(value)}
						style={{ width: 200 }}
					/>
					<Button type="primary" onClick={this.handleClick}>新增</Button>
				
				</div>

				<div className="todo-tab">
					<Tabs defaultActiveKey="1">
						<TabPane tab="未完成" key="1">
							<ul>
								{this.state.todoList.map((todo)=>{
									return (
										<div>
											<li key={todo} onClick={()=>{this.handleDelTodo(todo)}}>{todo}</li>
											<Button  onClick={()=>{this.handleEditTodo(todo)}}>修改</Button>
										</div>

									)
								})}
							</ul>
						</TabPane>
						<TabPane tab="已完成" key="2">
							已完成
						</TabPane>
					</Tabs>
				</div>

				<Modal
					title="新增 todo"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input placeholder="Basic usage" value={this.state.inputValue} onChange={this.handleInputChange}/>
				</Modal>

				<Modal
					title="修改 todo"
					visible={this.state.editVisible}
					onOk={this.handleEditOk}
					onCancel={this.handleEditCancel}
				>
					<Input placeholder="Basic usage" value={this.state.editInputValue} onChange={this.handleEditInputChange}/>
				</Modal>

			</div>
		)
	}

	
	// 1. 监听点击事件
	handleClick = ()=> {
		let { visible } = this.state;
		this.toggleModalVisible(!visible)
	}

	handleInputChange = (e) =>{
		console.log(e.target.value);
		this.setState({
			inputValue: e.target.value
		})
	}

	handleEditInputChange = (e) => {
		this.setState({
			editInputValue: e.target.value
		})
	}

	handleDelTodo = (target) => {
		this.setState({
			todoList: this.del(target)
		})
	}

	handleEditTodo = (target) => {
		this.setState({
			editInputValue: target,
			wantToEditInputValue: target
		})
		this.toggleEditModalVisible(true)
	}

	// 2. modal 显示隐藏
	toggleModalVisible(boolean){
		this.setState({
			visible: boolean
		})
		
	}

	toggleEditModalVisible(boolean){
		this.setState({
			editVisible: boolean
		})
	}
	
	handleOk = ()=>{
		this.toggleModalVisible(false)
		console.log(this.state.inputValue)
		let { inputValue} = this.state
		this.state.todoList.push(inputValue)
	}
	handleCancel = ()=>{
		this.toggleModalVisible(false)
	}


	handleEditOk = ()=>{
		let afterEditTodoList = this.edit(this.state.todoList, this.state.wantToEditInputValue, this.state.editInputValue)
		this.setState({
			todoList: afterEditTodoList
		})
		this.toggleEditModalVisible(false)
	}
	handleEditCancel = ()=>{

		this.toggleEditModalVisible(false)
	}

	del = (deoTodo) => {
		return this.state.todoList.filter((todo)=>{
			return todo !== deoTodo;
		})
	}

	edit = (array, todoItem, newTodoItem) => {
		return array.map(function(item) { return item === todoItem ? newTodoItem : item; });
	}
	
}

export default App;
