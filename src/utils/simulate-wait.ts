import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';
import { logColor } from './logger-color';

export async function simulateWait(
  milliseconds = SIMULATE_WAIT_IN_MS,
  verbose = false,
) {
  const delay = milliseconds > 0 ? milliseconds : SIMULATE_WAIT_IN_MS;

  if (delay <= 0) {
    return;
  }

  if (verbose) {
    logColor(`Delaying for ${delay / 1000}s`);
  }

  await new Promise(resolve => setTimeout(resolve, delay));
}
