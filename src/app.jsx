import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const divStyle = {
            height: '110px',
            width: '110px',
        };

        return (
            <div className='col-sm-6'>
                <div className='panel panel-default'>
                    <div className='panel-body'>
                        <div className='alert alert-success'>Total Change Due: {this.props.totalChangeDue} </div>
                        <div className='row'>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[0].name}
                                        <h4 className='change'>
                                            {this.props.result[0].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[1].name}
                                        <h4 className='change'>
                                            {this.props.result[1].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[2].name}
                                        <h4 className='change'>
                                            {this.props.result[2].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[3].name}
                                        <h4 className='change'>
                                            {this.props.result[3].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[4].name}
                                        <h4 className='change'>
                                            {this.props.result[4].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[5].name}
                                        <h4 className='change'>
                                            {this.props.result[5].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[6].name}
                                        <h4 className='change'>
                                            {this.props.result[6].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='panel panel-default'>
                                    <div className='panel-body text-center' style={divStyle}>
                                        {this.props.result[7].name}
                                        <h4 className='change'>
                                            {this.props.result[7].value}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: {
                USD: {
                    bills: [
                        { name: 'Twenties', value: 20 },
                        { name: 'Tens', value: 10 },
                        { name: 'Fives', value: 5 },
                        { name: 'Ones', value: 1 },
                    ],
                    coins: [
                        { name: 'Quarters', value: 25 },
                        { name: 'Dimes', value: 10 },
                        { name: 'Nickels', value: 5 },
                        { name: 'Pennies', value: 1 },
                    ],
                },
                MXN: {
                    bills: [
                        { name: 'Five Hundreds', value: 500 },
                        { name: 'Two Hundreds', value: 200 },
                        { name: 'One Hundreds', value: 100 },
                        { name: 'Fifties', value: 50 },
                        { name: 'Tens', value: 10 },
                        { name: 'Ones', value: 1 },
                    ],
                    coins: [
                        { name: 'Fifty Cents', value: 50 },
                        { name: 'Ten Cents', value: 10 },
                    ],
                },
                JPY: {
                    bills: [
                        { name: '10,000 Yen', value: 10000 },
                        { name: '5,000 Yen', value: 5000 },
                        { name: '2,000 Yen', value: 2000 },
                        { name: '1,000 Yen', value: 1000 },
                        { name: '500 Yen', value: 500 },
                        { name: '100 Yen', value: 100 },
                        { name: '10 Yen', value: 10 },
                        { name: '1 Yen', value: 1 },
                    ],
                    coins: [
                    ],
                },
            },
            result: [],
            selectedCurrency: 'USD',
        };

        this.handleClick = this.handleClick.bind(this);
        this.calculateChange = this.calculateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

    };

    renderTable() {
        return (
            <Table
                result={this.state.result}
                totalChangeDue={this.state.totalChangeDue}
                selectedCurrency={this.state.selectedCurrency}
            />
        )
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleClick() {
        this.calculateChange()
        this.setState({
            isToggle: true
        })
    }

    calculateChange() {
        var totalChangeDue = (parseFloat(this.state.recievedValue) - parseFloat(this.state.dueValue)).toFixed(2);
        var result = []
        var bills = totalChangeDue.toString().slice(0, -3);
        Number(bills)
        var coins = totalChangeDue.toString().slice(-2)
        Number(coins)
        var billsArr = this.state.currencies[this.state.selectedCurrency].bills
        var coinsArr = this.state.currencies[this.state.selectedCurrency].coins

        // calculates how much to give in each bill type
        for (let i = 0; i < billsArr.length; i++) {
            if (bills > 0) {
                var ans = Math.floor(bills / billsArr[i].value)
                result.push({ name: this.state.currencies[this.state.selectedCurrency].bills[i].name, value: ans })
                bills = bills - (billsArr[i].value * ans)
            }
            else {
                result.push({ name: this.state.currencies[this.state.selectedCurrency].bills[i].name, value: 0 })
            }
        }


        // calculates how much change to give in each coin type
        for (let i = 0; i < coinsArr.length; i++) {
            if (coins > 0) {
                var ans = Math.floor(coins / coinsArr[i].value)
                result.push({ name: this.state.currencies[this.state.selectedCurrency].coins[i].name, value: ans })
                coins = coins - (coinsArr[i].value * ans)
            }
            else {
                result.push({ name: this.state.currencies[this.state.selectedCurrency].coins[i].name, value: 0 })
            }
        }
        console.log(result)

        // sets the state to be the correct change needed
        this.setState({
            result: result,
            totalChangeDue: totalChangeDue,
            outputMessage: 'Total change due: ',
        })
    }



    render() {

        return (
            <div className='container'>
                <h1 style={{ color: 'white' }}>Change Calculator</h1>
                <hr></hr>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Enter Information</div>
                            <div className='panel-body'>
                                <label>How Much Is Due?</label>
                                <input onChange={this.handleChange} name="dueValue" type="number" className="form-control" placeholder="Enter due" required />
                            </div>
                            <div className='panel-body'>
                                <label>How Much Is Recieved?</label>
                                <input onChange={this.handleChange} name="recievedValue" type="number" className="form-control" placeholder="Enter recieved" required />
                            </div>
                            <div className='panel-body'>
                                <label>What Currency?</label>
                                <select name="selectedCurrency" onChange={this.handleChange} className="form-control">
                                    <option value="USD">USD</option>
                                    <option value="MXN">MXN</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </div>
                            <div className='panel-footer'>
                                <button onClick={this.handleClick} className='btn btn-primary btn-block'>Calculate</button>
                            </div>
                        </div>
                    </div>
                    {this.state.isToggle === true ? this.renderTable() : null}
                </div >
            </div>
        )
    }
}

export default App;




