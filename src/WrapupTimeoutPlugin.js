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
  init(flex, manager) {

    flex.Notifications.registerNotification({
      id: "automaticTaskCompletionWarning",
      content: <TaskCompletionWarning />,
      type: flex.NotificationType.info
    });

    manager.workerClient.on('reservationCreated', reservation => {

      const trueReservation = reservation.addListener
        ? reservation
        : reservation.source;

      trueReservation.addListener('wrapup', payload => {

        const { sid, task:  { attributes: { name, from }} } = payload;

        setTimeout(() => {

          flex.Actions.invokeAction('CompleteTask', {
            sid: sid,
          });
          
          flex.Notifications.showNotification("automaticTaskCompletionWarning", { 
            taskSid: sid,
            name: name !== "" ? name : from
          });
  
        }, parseInt(process.env.REACT_APP_TIMEOUT));

      });
    });
    
  }
}
