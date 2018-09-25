import React, { Component } from 'react';

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
    };

    this.handleDueChange = this.handleDueChange.bind(this);
    this.handleRecievedChange = this.handleRecievedChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateChange = this.calculateChange.bind(this);

  };

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
  }

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

    for (let i=0; i<dollarArr.length; i++) {
      if (dollars > 0) {
        var ans = Math.floor(dollars/ dollarArr[i])
        dollarOutput.push(ans)
        dollars = dollars - (dollarArr[i] * ans)
      }
      else {
        dollarOutput.push(0)
      }
    }

    this.setState({
      dollarOutput: dollarOutput,
    })

  
    // need to grab twenies, tens, fives and ones from array and set the state of them

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
                <input value={dueValue} onChange={this.handleDueChange} type="number" className="form-control" placeholder="Enter due" />
              </div>
              <div className='panel-body'>
                <label>How Much Is Recieved?</label>
                <input value={recievedValue} onChange={this.handleRecievedChange} type="number" className="form-control" placeholder="Enter recieved" />
              </div>
              <div className='panel-footer'>
                <button onClick={this.handleClick} className='btn btn-primary btn-block'>Calculate</button>
              </div>
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <div className='alert alert-success'>Total change due</div>

                <div className='row'>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Twenties</div>
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Tens</div>
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Fives</div>
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Ones</div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Quarters</div>
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Dimes</div>
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Nickles</div>
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='panel panel-default'>
                      <div className='panel-body'>Pennies</div>
                    </div>
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

export default App;
