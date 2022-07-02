import React, {Component} from "react";
import ReactEcharts from "echarts-for-react";
import fullDataService from "../services/data.service";

export default class Livestock extends Component {
  constructor(props) {
    super(props);
    this.getFrequencyData = this.getFrequencyData.bind(this);
    this.getHeadsData =this.getHeadsData.bind(this);

    this.getOptionOfFrequency = this.getOptionOfFrequency.bind(this);
    this.getOptionOfHeads = this.getOptionOfHeads.bind(this);



    this.state = {
      dataFrequency: [],
      dataHeads: null,

      dataHDDS: [],
      dataFoodConsumed: [],
      projectid: "lgs"
      // lgs/cir
    };
  }

  componentDidMount() {
    this.getFrequencyData();
    this.getHeadsData();
  }

  getFrequencyData() {
    fullDataService.getFrequencyByCondition(this.state.projectid)
      .then(res => {
        this.setState({
          dataFrequency: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getHeadsData() {
    fullDataService.getHeadsByCondition(this.state.projectid)
      .then(res => {
        this.setState({
          dataHeads: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }


  getOptionOfFrequency() {
    const {dataFrequency} = this.state;
    return ({
      tooltip: {},
      dataset: {
        source: dataFrequency
      },
      xAxis: {
        type: "category",
        axisLabel: { interval: 0, rotate: 45 }
      },
      yAxis: {
        type: "value"
      },
      series: [ {type: "bar"} ]
    });
  }

  getOptionOfHeads() {
    const {dataHeads} = this.state;
    let boxData = dataHeads || {};
    return ({
      dataset: [
        {
          source: Object.values(boxData)
        },
        {
          fromDatasetIndex: 0,
          transform: {
            type: 'boxplot',
            config: { itemNameFormatter: (data) => Object.keys(boxData)[data.value] }
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
        },
        axisLabel: { interval: 0, rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: 'Heads',
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
    const{dataFrequency, dataHeads, dataHDDS, dataFoodConsumed} = this.state;
    return(
      <div className="list row">

        <div className="col-md-6">
          <h4>Frequency Livestock Kept</h4>
          {dataFrequency.length !== 0 ?
            (<div>
              <ReactEcharts
                option={this.getOptionOfFrequency()}
              />
            </div>) :
            (<div>
              <p>Processing ...</p>
              <ReactEcharts
                option={this.getOptionOfFrequency()}
              />
            </div>)}
        </div>

        <div className="col-md-6">
          <h4>Heads of Each Species</h4>
          {dataHeads !== null ?
            (<div>
              <ReactEcharts
                option={this.getOptionOfHeads()}
              />
            </div>) :
            (<div>
              <p>Processing ...</p>
              <ReactEcharts
                option={this.getOptionOfHeads()}
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
