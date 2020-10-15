import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { Chart, Axis, LineAdvance } from 'bizcharts';
import style from './listen.scss';

const MAX_POINT = 25;

interface IPoint {
  temperature: number,
  time: string
}

function getTime(time: Date): string {
  const hour = time.getHours().toString();
  let min = time.getMinutes().toString();
  let sec = time.getSeconds().toString();
  if (min.length === 1) min = '0' + min;
  if (sec.length === 1) sec = '0' + sec;
  return hour + ':' + min + ':' + sec;
}

const Listen: React.FC = function() {
  const [data, setData] = useState(new Array<IPoint>(0));
  const [ws, setWs] = useState<WebSocket|null>(null);
  const history = useHistory();
  useEffect(() => {
    console.log('ws is open');
    const webSocket : WebSocket = new WebSocket('ws://' + location.host + '/record');
    setWs(webSocket);
    webSocket.onopen = () => {
      webSocket.send('temperature');
    }
    webSocket.onmessage = (msg: MessageEvent) => {
      setData((prev) => {
        const time = new Date();
        const timeLable: string = getTime(time);
        console.log(timeLable);
        const newPoint: IPoint = { temperature: parseFloat(msg.data), time: timeLable };
        let newData: IPoint[];
        if (prev.length <= MAX_POINT) {
          newData = prev.slice();
        } else {
          newData = prev.slice(prev.length - MAX_POINT);
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
    temperature: { alias: 'Temperature(C)', min: -20, max: 100 }
  }
  const label = {
    autoHide: false,
    autoRotate: false,
    formatter(text: string) {
      const sp = text.split(':');
      if (sp.length < 1) return '';
      const sec = parseInt(sp[2]);
      if (sec % 3 === 0) {
        return text;
      }
      return '';
    }
  }
  return (
    <div className={style.listenWrapper}>
      <h1 className = {style.title}>Temperature Real Time Display</h1>
      <Chart scale = {scale} padding={[50, 50]} autoFit height={400} width={800} data={data} >
        <LineAdvance shape="smooth" point area position="time*temperature" animate={{ update: false }}/>
        {/* <Point position = "time*temperature" animate={{ update: false }} /> */}
        <Axis name = 'time' label = {label} title/>
        <Axis name = 'temperature' title/>
      </Chart>
      <div></div>
      <Button className={style.btn} danger onClick = {() => { ws?.send('close'); ws?.close() }}>Stop Listen</Button>
      <Button className={style.btn} type = 'primary' onClick = {() => history.go(0)}>Reload</Button>
    </div>
  );
}
export default Listen;
