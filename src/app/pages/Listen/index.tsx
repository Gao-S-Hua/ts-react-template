import React, { useEffect, useState } from 'react';
import { Chart, Line, Point, Axis } from 'bizcharts';

interface IPoint {
  temperature: number,
  time: string
}

const Listen: React.FC = function() {
  const [data, setData] = useState(new Array<IPoint>(0));
  const [ws, setWs] = useState<WebSocket|null>(null);
  useEffect(() => {
    console.log('ws is open');
    const webSocket : WebSocket = new WebSocket('ws://' + location.host);
    setWs(webSocket);
    webSocket.onopen = () => {
      webSocket.send('temperature');
    }
    webSocket.onmessage = (msg: MessageEvent) => {
      setData((prev) => {
        const time = new Date();
        const timeLable: string = time.getMinutes().toString() + ':' + time.getSeconds().toString()
        const newPoint: IPoint = { temperature: parseInt(msg.data), time: timeLable };
        let newData: IPoint[];
        if (prev.length <= 24) {
          newData = prev.slice();
        } else {
          newData = prev.slice(prev.length - 24);
        }
        newData.push(newPoint);
        return newData;
      });
    }
    window.addEventListener('beforeunload', () => { webSocket.send('close'); webSocket.close(); });
    return () => { webSocket.send('close'); webSocket.close(); };
  }, []);

  const scale = {
    time: { alias: 'Time' },
    temperature: { alias: 'Temperature(C)', min: -20 }
  }
  const label = {
    autoHide: false,
    autoRotate: false,
    formatter(text: string) {
      const sp = text.split(':');
      if (sp.length < 1) return '';
      const sec = parseInt(sp[1]);
      if (sec % 3 === 0) {
        return text;
      }
      return '';
    }
  }
  return (
    <div>
      <Chart scale = {scale} padding={[30, 20, 50, 40]} autoFit height={320} width={800} data={data}>
        <Line animate = {false} position="time*temperature" />
        <Point animate = {false} position = "time*temperature" />
        <Axis name = 'time' label = {label}/>
      </Chart>
      <button onClick = {() => { ws?.send('close'); ws?.close() }}>Close</button>
    </div>
  );
}
export default Listen;
