import { Component, OnInit } from '@angular/core';
import {countries} from './countries';
import { ConverterService } from './converter.service';
import * as CanvasJS from '../../assets/js/canvasjs.min';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  title = 'Currency Exchange Rates';
  countries: string[];
  from = 'US dollar';
  to: string;
  fromVal: number;
  toVal: number;
  default = 'Indian rupee';
  description = '';
  previous: {[key: string]: string|number} = {};
  dataPoints = [];
  message: string;
  constructor(private converterService: ConverterService) {
    this.countries = countries;
  }
  ngOnInit() {
    this.getRates(1);
  }

  getChart(dataPoints) {
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: ''
      },
      subtitles: [{
        text: ''
      }],
      axisX: {
        labelFormatter(e) {
          return CanvasJS.formatDate( e.value, 'DD MMM YY');
        },
      },
      data: [
        {
          type: 'column',
          dataPoints
        }
      ]
    });
    chart.render();
  }

  getRates(id: number) {
    console.log(this.to, this.from);
    let to;
    let from;
    if (this.to || this.from) {
      if (!this.to) {
        this.to = this.default;
      }
      if (!this.from) {
        this.from = this.default;
      }
      if (+id === 1) {
        to = this.to;
        from = this.from;
        if (!this.fromVal) {
          this.fromVal = 1;
        }
      } else if (+id === 2) {
        to = this.from;
        from = this.to;
        if (!this.toVal) {
          this.toVal = 1;
        }
      }
      const toCode = this.converterService.getCountryCode(to);
      const fromCode = this.converterService.getCountryCode(from);
      this.getHistory(fromCode, toCode);
      this.description = '';
      this.converterService.getRates(toCode, fromCode).subscribe(
        (response) => {
          if (+id === 1) {
            this.toVal = +response.rates[toCode] * this.fromVal;
          } else if (+id === 2) {
            this.fromVal = +response.rates[toCode] * this.toVal;
          }
          console.log(response);
          this.description = `1 ${from} equals ${response.rates[toCode]} ${to} as of ${response.date}`;
          this.previous = {to, from, rate: this.fromVal};
        },
        (error) => {
          console.log(error);
          this.description = error.error.error;
        }
      );
    }
  }

  getHistory(fromCode, toCode) {
    this.converterService.getHistory(toCode, fromCode).subscribe(
      (response) => {
        this.dataPoints = [];
        this.message = undefined;
        for (const [key, value] of Object.entries(response.rates)) {
          this.dataPoints.push({y: value[toCode], x: this.formatDate(key)});
        }
        console.log(this.dataPoints);
        this.getChart(this.dataPoints);
      },
      (error) => {
        console.log(error);
        this.dataPoints = [];
        this.getChart(this.dataPoints);
        this.message = error.error.error;
      }
    );
  }

  formatDate(date) {
    const date$ = date.split('-');
    return new Date(+date$[0], +date$[1], +date$[2]);
  }
}
