#!/bin/bash

cd /Users/zhangxiazhen/figoxu/github.com/ts_practice/tutorial/02_event_bus
npm test -- -t "EventBus"


cd ts_practice/tutorial/01_config_manager/src
npm test -- src/__tests__/config-v1.test.ts
npm test -- -t "EnhancedConfigManager"
