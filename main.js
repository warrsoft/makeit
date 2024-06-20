import './style.css'
import { App } from './src/app.js';
import Storage from './src/storage/app-storage.js';

Storage.init();
App('#app');