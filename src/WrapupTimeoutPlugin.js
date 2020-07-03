import React from 'react';
import { FlexPlugin } from 'flex-plugin';

import TaskCompletionWarning from './components/TaskCompletionWarning';

const PLUGIN_NAME = 'WrapupTimeoutPlugin';

export default class WrapupTimeoutPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex) {

    flex.Notifications.registerNotification({
      id: "automaticTaskCompletionWarning",
      content: <TaskCompletionWarning />,
      type: flex.NotificationType.info
    });

    flex.Actions.addListener("beforeHangupCall", (payload) => {

      const { taskSid } = payload.task;
      const { name, from} = payload.task.attributes;
      
      setTimeout(() => {
        payload.task.complete();
        
        flex.Notifications.showNotification("automaticTaskCompletionWarning", { 
          taskSid,
          name: name !== "" ? name : from
        });

      }, parseInt(process.env.REACT_APP_TIMEOUT));

    });
    
  }
}
