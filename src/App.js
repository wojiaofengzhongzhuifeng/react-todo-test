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
			inputValue: '',
			todoList: []
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
										<li key={todo}>{todo}</li>
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

	// 2. modal 显示隐藏
	toggleModalVisible(boolean){
		this.setState({
			visible: boolean
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
	
}

export default App;
