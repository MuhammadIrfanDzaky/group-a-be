export interface ComponentDetails {
  [key: string]: any;
}

export interface ComponentHealth {
  status: 'UP' | 'DOWN';
  details?: ComponentDetails;
}

export interface HealthCheckResponse {
  status: 'UP' | 'DOWN';
  components: {
    database?: ComponentHealth;
    downstreamServiceA?: ComponentHealth;
    messageQueue?: ComponentHealth;
    [key: string]: ComponentHealth | undefined;
  };
}

