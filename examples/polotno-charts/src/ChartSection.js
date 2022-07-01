import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import * as svg from 'polotno/utils/svg';
import AiFillPieChart from '@meronex/icons/ai/AiFillPieChart';
import { Button, InputGroup, HTMLSelect } from '@blueprintjs/core';
import { Chart } from 'frappe-charts';

// create svg image for QR code for input text
export async function getChart({ data, type }) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.style.width = '400px';
  const chart = new Chart(div, {
    animate: 0,
    data: {
      labels: data[0].map((_, index) => index + 1),

      datasets: data.map((values) => ({ name: 'Some Data', values })),
    },
    type, // or 'bar', 'line', 'pie', 'percentage'
    height: 300,
    colors: ['purple', '#ffa3ef', 'light-blue', 'green', 'red'],
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const svgNode = div.querySelector('svg');
  svgNode.setAttribute('viewBox', '0 0 400 300');
  svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const legend = svgNode.querySelector('.chart-legend');
  if (legend) {
    legend.parentElement.removeChild(legend);
  }

  const str = svgNode.outerHTML;
  document.body.removeChild(div);
  return svg.svgToURL(str);
}

// define the new custom section
export const ChartSection = {
  name: 'charts',
  Tab: (props) => (
    <SectionTab name="Charts" {...props}>
      <AiFillPieChart />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const [val, setVal] = React.useState(['25,40,10']);
    const [type, setType] = React.useState('pie');

    const el = store.selectedElements[0];
    const isChart = el?.name === 'chart';

    // if selection is changed we need to update input value
    React.useEffect(() => {
      if (el?.custom?.value) {
        setVal(el?.custom?.value);
        setType(el?.custom?.type);
      }
    }, [isChart, el]);

    // // update image src when we change input data
    React.useEffect(() => {
      if (isChart) {
        getChart({ data: val.map((e) => e.split(',')), type }).then((src) => {
          el.set({
            src,
            custom: {
              value: val,
              type,
            },
          });
        });
      }
    }, [el, val, type, isChart]);

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '4px',
            paddingBottom: '7px',
          }}
        >
          <div style={{ lineHeight: '23px' }}>Char type:</div>
          <HTMLSelect
            style={{ width: '100px' }}
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option>pie</option>
            <option>bar</option>
            <option>line</option>
            <option>percentage</option>
          </HTMLSelect>
        </div>
        {val.map((row, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '5px',
            }}
          >
            <InputGroup
              onChange={(e) => {
                const copy = val.slice();
                copy[index] = e.target.value;
                setVal(copy);
              }}
              placeholder="Type qr code content"
              value={row}
              style={{ width: '100%' }}
            />
            <Button
              disabled={val.length === 1}
              onClick={() => {
                let copy = val.slice();
                copy.splice(index, 1);
                setVal(copy);
              }}
            >
              Remove row
            </Button>
          </div>
        ))}
        <Button
          style={{ marginTop: '5px' }}
          onClick={() => {
            const lastLine = val[val.length - 1];
            const newLine = lastLine
              .split(',')
              .map((_) => Math.round(Math.random() * 100))
              .join(',');
            setVal(val.concat([newLine]));
          }}
        >
          Add row
        </Button>

        <Button
          style={{
            display: isChart ? 'none' : '',
          }}
          fill
          onClick={async () => {
            const src = await getChart({
              data: val.map((e) => e.split(',')),
              type,
            });

            store.activePage.addElement({
              type: 'svg',
              name: 'chart',
              x: 50,
              y: 50,
              width: 400,
              height: 300,
              src,
              custom: {
                value: val,
              },
            });
          }}
        >
          Add new chart
        </Button>
      </div>
    );
  }),
};
