import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.selectedCurrency === 'USD') {

      return (
        <div className='col-sm-6'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className='alert alert-success'>{this.props.outputMessage}{this.props.totalChangeDue}</div>

              <div className='row'>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Twenties
                <h4 className='change'>
                        {this.props.twenties}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Tens
                <h4 className='change'>
                        {this.props.tens}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Fives
                <h4 className='change'>
                        {this.props.fives}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Ones
                <h4 className='change'>
                        {this.props.ones}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Quarters
                <h4 className='change'>
                        {this.props.quarters}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Dimes
                <h4 className='change'>
                        {this.props.dimes}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Nickles
                <h4 className='change'>
                        {this.props.nickles}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='panel panel-default'>
                    <div className='panel-body text-center'>
                      Pennies
                <h4 className='change'>
                        {this.props.pennies}
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

}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueValue: '',
      recievedValue: '',
      totalChangeDue: '',
      dollars: '',
      coins: '',
      dollarOutput: '',
      twenties: '',
      tens: '',
      fives: '',
      ones: '',
      coinsOutput: '',
      quarters: '',
      dimes: '',
      nickles: '',
      pennies: '',
      outputMessage: '',
      isToggle: false,
      selectedCurrency: 'USD'
    };

    this.handleDueChange = this.handleDueChange.bind(this);
    this.handleRecievedChange = this.handleRecievedChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

  };

  renderTable() {
    return (
      <Table
        dueValue={this.state.dueValue}
        recievedValue={this.state.recievedValue}
        totalChangeDue={this.state.totalChangeDue}
        dollars={this.state.dollars}
        coins={this.state.coins}
        dollarsOutput={this.state.dollarOutput}
        twenties={this.state.twenties}
        tens={this.state.tens}
        fives={this.state.fives}
        ones={this.state.ones}
        coinsOutput={this.state.coinsOutput}
        quarters={this.state.quarters}
        dimes={this.state.dimes}
        nickles={this.state.nickles}
        pennies={this.state.pennies}
        outputMessage={this.state.outputMessage}
        isToggle={this.state.isToggle}
        selectedCurrency={this.state.selectedCurrency}
      />
    )
  }

  handleDueChange(event) {
    this.setState({
      dueValue: event.target.value
    })
  }

  handleRecievedChange(event) {
    this.setState({
      recievedValue: event.target.value
    })
  }

  handleClick() {
    this.calculateChange();

    this.setState({
      isToggle: true
    })
  }

  handleSelectChange(event) {
    this.setState({
      selectedCurrency: event.target.value
    });
  };

  calculateChange() {
    var totalChangeDue = (parseFloat(this.state.recievedValue) - parseFloat(this.state.dueValue)).toFixed(2);
    var dollars = totalChangeDue.toString().slice(0, -3);
    var coins = totalChangeDue.toString().slice(-2)

    // sets the state of total change, broken into dollars and coins
    this.setState({
      totalChangeDue: totalChangeDue,
      dollars: dollars,
      coins: coins,
    })

    // calculates how many dollars to give in each bill type
    var dollarArr = [20, 10, 5, 1]
    var dollarOutput = []
    Number(dollars)

    for (let i = 0; i < dollarArr.length; i++) {
      if (dollars > 0) {
        var ans = Math.floor(dollars / dollarArr[i])
        dollarOutput.push(ans)
        dollars = dollars - (dollarArr[i] * ans)
      }
      else {
        dollarOutput.push(0)
      }
    }

    // calculates how much change to give in each coin type
    var coinsArr = [25, 10, 5, 1]
    var coinsOutput = []
    Number(coins)

    for (let i = 0; i < coinsArr.length; i++) {
      if (coins > 0) {
        var ans = Math.floor(coins / coinsArr[i])
        coinsOutput.push(ans)
        coins = coins - (coinsArr[i] * ans)
      }
      else {
        coinsOutput.push(0)
      }
    }

    // sets the state to be the correct change needed
    this.setState({
      dollarOutput: dollarOutput,
      twenties: dollarOutput[0],
      tens: dollarOutput[1],
      fives: dollarOutput[2],
      ones: dollarOutput[3],
      coinsOutput: coinsOutput,
      quarters: coinsOutput[0],
      dimes: coinsOutput[1],
      nickles: coinsOutput[2],
      pennies: coinsOutput[3],
      outputMessage: 'Total change due: $'
    })


  }



  render() {
    var dueValue = this.state.dueValue;
    var recievedValue = this.state.recievedValue;


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
                <input value={dueValue} onChange={this.handleDueChange} name="amountDue" type="number" className="form-control" placeholder="Enter due" required />
              </div>
              <div className='panel-body'>
                <label>How Much Is Recieved?</label>
                <input value={recievedValue} onChange={this.handleRecievedChange} name="amountReceived" type="number" className="form-control" placeholder="Enter recieved" required />
              </div>
              <div className='panel-body'>
                <label>What Currency?</label>
                <select onChange={this.handleSelectChange} className="form-control">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
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
