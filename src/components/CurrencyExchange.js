import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { currencyList } from "./currencyList";

class CurrencyExchange extends Component {
    constructor(props) {
        super(props);
        this.state ={
            currencies: [],
            currencyOptions: [],
            base: '',
            baseValue: 0,
            exchange: '',
            exchangeValue: 0,
            rates: null,
            exchangeHistory: null,
        }
    }

    componentDidMount() {
        const currencyOptions = [];
        const exchangerateHistory = []
        Object.keys(currencyList).forEach((key) => currencyOptions.push(currencyList[key]));
        this.setState({currencyOptions});
    }

    

    onValueChange(baseChanged, value){
        const { base, exchange, rates, currencyOptions } = this.state;
        if(base && exchange && rates) {
            const exchangeOption = currencyOptions.filter(item => item.name == exchange)[0];
            const exchangeRate = rates[exchangeOption.code];
            if(baseChanged) {
                const exchangeValue = value * exchangeRate;
                this.setState({ baseValue: value, exchangeValue: exchangeValue});
            } else {
                const baseValue = value / exchangeRate;
                this.setState({ baseValue: baseValue, exchangeValue: value});
            }
        } else {
            if(baseChanged) {
                this.setState({baseValue: value});
            } else {
                this.setState({exchangeValue: value});
            }
        }
    }

    onOptionChange(base, value) {
        const { currencyOptions, exchange, exchangeValue, baseValue, rates } = this.state;
        const selectedOption = currencyOptions.filter(item => item.name == value)[0];
        if(base) {
            axios.get(`https://api.exchangeratesapi.io/latest?base=${selectedOption.code}`)
            .then(resp => {
                this.setState({rates: resp.data.rates});
                if(exchange && baseValue) {
                    const exchangeOption = currencyOptions.filter(item => item.name == exchange)[0];
                    const exchangeRate = rates[exchangeOption.code];
                    this.setState({exchangeValue: exchangeRate * baseValue});
                }
            })
            .catch(error => {
                console.log(error);
            });
            this.setState({base: value});
        } else {
            const exchangeRate = rates[selectedOption.code];
            this.setState({exchange: value, exchangeValue: exchangeRate * baseValue});
        }
    }

    getLast15DaysRates() {
        const { base, exchange, currencyOptions } = this.state;
        const selectedOption = currencyOptions.filter(item => item.name == base)[0];
        const exchangeOption = currencyOptions.filter(item => item.name == exchange)[0];
        axios.get(`https://api.exchangeratesapi.io/history?start_at=2021-02-25&end_at=2021-03-06&base=${selectedOption.code}&symbols=${exchangeOption.code}`)
        .then(resp => {
            const rates = resp.data.rates;
            this.setState({exchangeHistory: rates});
        })
        .catch(error => {
            console.log(error);
        });
        console.log(this.state);
    }

    render() {
        const { currencyOptions, base, exchange, baseValue, exchangeValue, rates,exchangeHistory } = this.state;
        console.log(exchangeHistory);
        let exchangeRate = '';
        if(currencyOptions && base && exchange) {
            const exchangeOption = currencyOptions.filter(item => item.name == exchange)[0];
            exchangeRate = rates[exchangeOption.code];
        }
   return (
          <div className="ml-4 card card-body parent">
                 <div>
                     {!!(baseValue && base && exchange) &&
                       <div className="ml-4">
                         <h4>1 {base}is equivalent to</h4>
                         <h2>{exchangeValue/baseValue} {exchange}</h2>
                       </div> 
                            } 
                     <form className="form-inline mb-4 formsize">
                        <input className = "form-control form-control-lg mx-3 " value={baseValue} onChange={(e) => this.onValueChange(true, e.target.value)}  />
                        <select className="form-control form-control-lg" onChange={(e)=> this.onOptionChange(true, e.target.value)} value={base}>
                            {currencyOptions && currencyOptions.map(cur => {
                                return <option>{cur.name}</option>
                            })}
                        </select>
                      </form>
                     <form className="form-inline mb-4 formsize">
                       <input className = "form-control form-control-lg mx-3" value={exchangeValue} onChange={(e) => this.onValueChange(false, e.target.value)} />
                        <select className="form-control form-control-lg" onChange={(e) => this.onOptionChange(false, e.target.value)} value={exchange}>
                        {currencyOptions && currencyOptions.map(cur => {
                            return <option>{cur.name}</option>
                        })}
                        </select>
                      </form>
                    </div>
                   {base && exchange &&
                     <div className="historycontainer">
    
                                {base && exchange &&
                                    <div className="ml-4 clickhere" onClick={() => this.getLast15DaysRates()}>
                                        Click here to view Exchangerate history
                                    </div>
                                }
                                <h2 className= "ml-4">HISTORICAL RATES TABLE</h2>
                                            
                                <table className="table table-dark table-hover  historytable">
                                <thead> 
                                    <tr>
                                    <th>Dates</th>
                                    <th>Base</th>
                                    <th>Exchange</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!exchangeHistory && <tr>Empty. Please get data.</tr>}
                                    { exchangeHistory && Object.keys(exchangeHistory).map(key => {
                                        const exchangeOption = currencyOptions.filter(item => item.name == exchange)[0];
                                        return (<tr key={key}>
                                            <td>{key}</td>
                                            <td>1</td>
                                            <td>{exchangeHistory[key][exchangeOption.code]}</td>
                                        </tr>);
                                    })}
                            </tbody>
                      </table>
                  </div>
                 }
            </div>
        
        );
    }
}
export default CurrencyExchange;
