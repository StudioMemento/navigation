import test from 'node:test';
import assert from 'node:assert/strict';
import {Telemetry} from '../public/src/telemetry.mjs';
test('a first-frame stall is included in frame intervals and full-window FPS',()=>{
 const meter=Object.assign(Object.create(Telemetry.prototype),{pending:[],gl:{},ext:null,gpu:[],longTasks:[],renderer:{info:{render:{calls:1,triangles:2}}}});
 meter.start(1);const start=meter.started;meter.begin();meter.end(start+500,'orbit');meter.begin();meter.end(start+1000,'orbit');
 assert.equal(meter.result.frames,2);assert.ok(Math.abs(meter.result.meanFps-2)<1e-10);assert.ok(Math.abs(meter.result.firstFrameLatencyMs-500)<1e-10);assert.ok(Math.abs(meter.result.worstFrameMs-500)<1e-10);assert.equal(meter.result.framesOver33ms,2);
});
