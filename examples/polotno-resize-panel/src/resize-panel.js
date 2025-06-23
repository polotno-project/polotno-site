import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, NumericInput, HTMLSelect } from '@blueprintjs/core';
import { pxToUnitRounded, unitToPx } from 'polotno/utils/unit';

const MIN_PX = 10;

const PRESETS = [
  { label: 'IG Post', w: 1080, h: 1080, unit: 'px' },
  { label: 'IG Story', w: 1080, h: 1920, unit: 'px' },
  { label: 'Full HD', w: 1920, h: 1080, unit: 'px' },
  { label: 'A4', w: 21, h: 29.7, unit: 'cm' },
  { label: 'Letter', w: 8.5, h: 11, unit: 'in' },
];

const Num = ({ value, onChange, ...rest }) => {
  const [val, setVal] = useState(value);
  useEffect(() => setVal(value), [value]);
  return (
    <NumericInput
      {...rest}
      value={val}
      onValueChange={(v) => setVal(v)}
      onBlur={() => onChange(val)}
      onKeyDown={(e) => e.key === 'Enter' && onChange(val)}
      allowNumericCharactersOnly={false}
      fill
    />
  );
};

export const ResizePanel = observer(({ store }) => {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  useEffect(() => {
    setW(
      pxToUnitRounded({ px: store.width, unit: store.unit, dpi: store.dpi })
    );
    setH(
      pxToUnitRounded({ px: store.height, unit: store.unit, dpi: store.dpi })
    );
  }, [store.width, store.height, store.unit, store.dpi]);

  const applyResize = (unitW = w, unitH = h) => {
    const widthPx = unitToPx({
      unitVal: unitW,
      unit: store.unit,
      dpi: store.dpi,
    });
    const heightPx = unitToPx({
      unitVal: unitH,
      unit: store.unit,
      dpi: store.dpi,
    });
    if (widthPx >= MIN_PX && heightPx >= MIN_PX)
      store.setSize(widthPx, heightPx, true);
  };

  const Row = ({ children }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ padding: 16, overflowY: 'auto', maxHeight: '100%' }}>
      <Row>
        <div style={{ width: 60 }}>Width</div>
        <Num value={w} onChange={setW} min={1} />
      </Row>
      <Row>
        <div style={{ width: 60 }}>Height</div>
        <Num value={h} onChange={setH} min={1} />
      </Row>
      <Row>
        <div style={{ width: 60 }}>Units</div>
        <HTMLSelect
          value={store.unit}
          options={['px', 'cm', 'in']}
          onChange={(e) =>
            store.setUnit({ unit: e.target.value, dpi: store.dpi })
          }
          fill
        />
      </Row>
      <Button
        intent="primary"
        fill
        onClick={() => applyResize()}
        style={{ marginBottom: 16 }}
      >
        Resize
      </Button>

      {/* preset buttons, one per row */}
      {PRESETS.map(({ label, w: pw, h: ph, unit }) => (
        <Button
          key={label}
          fill
          style={{ height: 60, marginBottom: 8 }}
          onClick={() => {
            store.setUnit({ unit, dpi: store.dpi });
            applyResize(pw, ph);
          }}
        >
          {label}
          <span style={{ fontSize: '0.75em', marginLeft: 6, opacity: 0.7 }}>
            {pw}×{ph} {unit}
          </span>
        </Button>
      ))}
    </div>
  );
});
