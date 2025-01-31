import { Finding, Machine, UserLogon } from '../../types';
import { GraphClient } from '../../ms-graph/client';

export class DefenderClient extends GraphClient {
  constructor(logger, config) {
    super(logger, { ...config, isDefenderApi: true });
  }
  BASE_URL_API: string = 'https://api.securitycenter.microsoft.com/api';

  // https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/get-machines?view=o365-worldwide
  public async iterateMachines(
    callback: (machine: Machine) => void | Promise<void>,
  ): Promise<void> {
    return this.iterateResources({
      resourceUrl: `${this.BASE_URL_API}/machines`,
      callback,
    });
  }

  // https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/get-machine-log-on-users?view=o365-worldwide
  public async iterateLogonUsers(
    input: {
      machineId: string;
    },
    callback: (logonUser: UserLogon) => void | Promise<void>,
  ): Promise<void> {
    return this.iterateResources({
      resourceUrl: `${this.BASE_URL_API}/machines/${input.machineId}/logonusers`,
      callback,
    });
  }

  // https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/get-discovered-vulnerabilities?view=o365-worldwide
  public async iterateFindings(
    input: {
      machineId: string;
    },
    callback: (finding: Finding) => void | Promise<void>,
  ): Promise<void> {
    const url = `${this.BASE_URL_API}/machines/${input.machineId}/vulnerabilities?`;
    return this.iterateResources({
      resourceUrl: url,
      callback,
    });
  }
}
