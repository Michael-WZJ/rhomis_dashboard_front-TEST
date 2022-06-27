import React, {Component} from "react";
import ReactEcharts from "echarts-for-react";
import fullDataService from "../services/data.service";

export default class FoodSecurity extends Component {
  constructor(props) {
    super(props);
    this.getHFIASData = this.getHFIASData.bind(this);
    this.getFoodShortageData = this.getFoodShortageData.bind(this);
    this.getHDDSData = this.getHDDSData.bind(this);
    this.getFoodConsumedData = this.getFoodConsumedData.bind(this);

    this.getOptionOfHFIAS = this.getOptionOfHFIAS.bind(this);
    this.getOptionOfFoodShortage = this.getOptionOfFoodShortage.bind(this);
    this.getOptionOfHDDS = this.getOptionOfHDDS.bind(this);
    this.getOptionOfFoodConsumed = this.getOptionOfFoodConsumed.bind(this);

    this.state = {
      dataHFIAS: [],
      dataFoodShortage: null,
      dataHDDS: [],
      dataFoodConsumed: [],
      projectid: "snv"
      // lgs
    };
  }

  componentDidMount() {
    this.getHFIASData();
    this.getFoodShortageData();
    this.getHDDSData();
    this.getFoodConsumedData();
  }

  getHFIASData() {
    fullDataService.getHFIASByCondition(this.state.projectid)
      .then(res => {
        this.setState({
          dataHFIAS: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFoodShortageData() {
    fullDataService.getFoodShortageByCondition(this.state.projectid)
      .then(res => {
        this.setState({
          dataFoodShortage: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFoodConsumedData() {
    fullDataService.getFoodConsumedByCondition(this.state.projectid)
      .then(res => {
        this.setState({
          dataFoodConsumed: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getHDDSData() {
    fullDataService.getHDDSByCondition(this.state.projectid)
      .then(res => {
        this.setState({
          dataHDDS: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }


  getOptionOfHFIAS() {
    const {dataHFIAS} = this.state;
    return ({
      tooltip: {
        trigger: "item",
        formatter: "{c} ({d}%)"
      },
      legend: {
        top: "5%",
        left: "center"
      },
      series: [{
        data: dataHFIAS,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "1rem",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        }
      }]
    });
  }

  getOptionOfFoodShortage() {
    const {dataFoodShortage} = this.state;
    if (dataFoodShortage === null) {
      return ({
        xAxis: {
          type: "category",
          data: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        },
        yAxis: {
          type: "value"
        },
        series: [ {type: "bar"} ]
      });
    } else {
      const ave = dataFoodShortage.average.toFixed(2);
      let aveText = "average number of months with food shortage: " + ave;
      return ({
        title: {
          text: "",
          subtext: aveText
        },
        tooltip: {},
        dataset: {
          source: dataFoodShortage.dataset
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [ {type: "bar"} ]
      });
    }
  }

  getOptionOfHDDS() {
    const {dataHDDS} = this.state;
    let xMap = {
      0: "Lean Season",
      1: "Flush Season",
    }
    return ({
      dataset: [
        {
          source: dataHDDS
        },
        {
          fromDatasetIndex: 0,
          transform: {
            type: 'boxplot',
            config: { itemNameFormatter: (data) => xMap[data.value] }
          }
        },
        {
          fromDatasetIndex: 1,
          fromTransformResult: 1
        }
      ],
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: 'Score',
        splitArea: {
          show: true
        }
      },
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          datasetIndex: 1
        },
        {
          name: 'outlier',
          type: 'scatter',
          datasetIndex: 2
        }
      ]
    })
  }

  getOptionOfFoodConsumed() {
    const {dataFoodConsumed} = this.state;
    if (dataFoodConsumed.length === 0) {
      return ({
        xAxis: {
          type: "category",
          data: ['eggs', 'fruits', 'grainsrootstubers', 'legumes', 'meat',
            'milk_dairy', 'nuts_seeds', 'veg_leafy', 'vegetables', 'vita_veg_fruit'],
          axisLabel: { interval: 0, rotate: 45 }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {name: "Lean Season", type: "bar"},
          {name: "Flush Season", type: "bar"}
        ]
      });
    } else {
      return ({
        tooltip: {
          trigger: "axis",
          axisPointer: {type: "shadow"}
        },
        legend: {},
        dataset: {
          source: dataFoodConsumed
        },
        xAxis: {
          type: "category",
          axisLabel: { interval: 0, rotate: 45 }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {name: "Lean Season", type: "bar"},
          {name: "Flush Season", type: "bar"}
        ]
      });
    }

  }


  render() {
    const{dataHFIAS, dataFoodShortage, dataHDDS, dataFoodConsumed} = this.state;
    return(
      <div className="list row">

        <div className="col-md-6">
          <h4>HFIAS</h4>
          {dataHFIAS.length !== 0 ?
            (<div>
              <ReactEcharts
                option={this.getOptionOfHFIAS()}
              />
            </div>) :
            (<div>
              <p>Processing ...</p>
              <ReactEcharts
                option={this.getOptionOfHFIAS()}
              />
            </div>)}
        </div>

        <div className="col-md-6">
          <h4>Food Shortage</h4>
          {dataFoodShortage !== null ?
            (<div>
              <ReactEcharts
                option={this.getOptionOfFoodShortage()}
              />
            </div>) :
            (<div>
              <p>Processing ...</p>
              <ReactEcharts
                option={this.getOptionOfFoodShortage()}
              />
            </div>)}
        </div>

        <div className="col-md-6">
          <h4>HDDS</h4>
          {dataHDDS.length !== 0 ?
            (<div>
              <ReactEcharts
                option={this.getOptionOfHDDS()}
              />
            </div>) :
            (<div>
              <p>Processing ...</p>
              <ReactEcharts
                option={this.getOptionOfHDDS()}
              />
            </div>)}
        </div>

        <div className="col-md-6">
          <h4>Food Consumed</h4>
          {dataFoodConsumed.length !== 0 ?
            (<div>
              <ReactEcharts
                option={this.getOptionOfFoodConsumed()}
              />
            </div>) :
            (<div>
              <p>Processing ...</p>
              <ReactEcharts
                option={this.getOptionOfFoodConsumed()}
              />
            </div>)}
        </div>

      </div>
    )
  }
}
