/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { MonitoringTimeseriesContainer } from '../../chart';
import {
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiPage,
  EuiPageBody,
  EuiFlexGroup,
  EuiPageContent,
  EuiScreenReaderOnly,
} from '@elastic/eui';
import { Status } from './status';
import { AlertsCallout } from '../../../alerts/callout';

export function ApmServerInstance({ summary, metrics, alerts, ...props }) {
  const seriesToShow = [
    metrics.apm_requests,
    metrics.apm_responses_valid,

    metrics.apm_responses_errors,
    metrics.apm_acm_request_count,

    metrics.apm_acm_response,
    metrics.apm_acm_response_errors,

    metrics.apm_output_events_rate_success,
    metrics.apm_output_events_rate_failure,

    metrics.apm_transformations,
    metrics.apm_cpu,

    metrics.apm_memory,
    metrics.apm_os_load,
  ];

  const charts = seriesToShow.map((data, index) => (
    <EuiFlexItem style={{ minWidth: '45%' }} key={index}>
      <MonitoringTimeseriesContainer series={data} {...props} />
    </EuiFlexItem>
  ));

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiScreenReaderOnly>
          <h1>
            <FormattedMessage
              id="xpack.monitoring.apm.instance.heading"
              defaultMessage="APM server instance"
            />
          </h1>
        </EuiScreenReaderOnly>
        <EuiPanel>
          <Status stats={summary} alerts={alerts} />
        </EuiPanel>
        <EuiSpacer size="m" />
        <AlertsCallout
          alerts={alerts}
          nextStepsFilter={(nextStep) => {
            if (nextStep.text.includes('APM servers')) {
              return false;
            }
            return true;
          }}
        />
        <EuiPageContent>
          <EuiFlexGroup wrap>{charts}</EuiFlexGroup>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
