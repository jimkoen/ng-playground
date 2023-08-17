import { RoundToNearestPipe } from './decimal-places.pipe';

describe('DecimalPlacesPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundToNearestPipe();
    expect(pipe).toBeTruthy();
  });
});
