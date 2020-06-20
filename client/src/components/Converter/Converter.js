import React from 'react';
// import './App.css';
// import Convert from '../Convert/Convert'


  class Converts extends React.Component{
    constructor(props){
        super(props);
        this.BASE_URL = 'https://api.cryptonator.com/api/ticker/';
        // fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        this.chartRef = null;
        this.state = {
          currencies: ["BTC", "ETH", "LTC"],
          base: "USD",
          amount: '',
          convertTo: "BTC",
          result: '',
            btcusd: '-',
            ltcusd: '-',
            ethusd: '-',
            // currbtc: '-',
            // currusd: '-',
            // currusd: '-'
          }
        }

getDataFor(conversion, prop){
        fetch(this.BASE_URL + conversion)
        .then(res => res.json())
        .then(d => {
            if(prop === 'btcusd'){
                
                this.setState({
                    initValue: d.ticker.price
                })
            }

            this.setState({
                [prop]: d.ticker.price
            });
        })
        
    }

        calculate = (props) => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      const result = (this.state.btcusd * amount).toFixed(2)
          console.log(result)
          this.setState({
            result
          });
    }
  }; 

   handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null
      },
      this.calculate
    );
  };
  

  componentDidMount() {
        this.getDataFor('btc-usd', 'btcusd');
        this.getDataFor('usd-ltc', 'ethusd');
        this.getDataFor('usd-eth', 'ltcusd');
        // this.getCurrencyFor('usd-eth', 'currusd');
        // this.getCurrencyFor('usd-eth', 'currusd');
        // this.getCurrencyFor('usd-eth', 'currusd');
    }

// getDataFor(conversion, prop){
//         fetch(this.BASE_URL + conversion)
//         .then(res => res.json())
//         .then(d => {
//             if(prop === 'btcusd'){
//                 const dataSource = this.state.dataSource;
//                 dataSource.chart.yAxisMaxValue =  parseInt(d.ticker.price) + 5;
//                 dataSource.chart.yAxisMinValue =  parseInt(d.ticker.price) - 5;
//                 dataSource.dataset[0]['data'][0].value = d.ticker.price;
//                 this.setState({
//                     showChart: true,
//                     dataSource: dataSource,
//                     initValue: d.ticker.price
//                 }, ()=>{
                    
//                     this.startUpdatingData();
//                 })
//             }

//             this.setState({
//                 [prop]: d.ticker.price
//             });
//         })
        
//     }

  render(){
    const {currencies, amount, result, base, convertTo, btcusd} = this.state
    return (
      <div className=" text-center m-auto">
      
        <h1>Convert</h1>

        <form className="form-inline mb-4">
                    <input type="number" value={amount}
                      onChange={this.handleInput}
                      className="form-control form-control-lg mx-3"
                    />
                    <input type="button" className="form-control form-control-lg" value="BTC" />
                   
                  </form>

                  <form className="form-inline mb-4">
                    <input
                      disabled={true}
                      value={
                        amount === ""
                          ? "0"
                          : result === null
                          ? "Calculating..."
                          : result
                      }
                      className="form-control form-control-lg mx-3"
                    />
                    <input type="button" className="form-control form-control-lg" value={base}/><br></br>
                    <input type="button" className="form-control form-control-lg btn-success" value="SELL"/>
                  </form>
                  
                  
      </div>
    );
  }
}

export default Converts;
