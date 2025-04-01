import { Suspense } from 'react';

import { Loading } from '@/components/loading';
import { Movies } from './movies';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Movies />
    </Suspense>
  );
}
