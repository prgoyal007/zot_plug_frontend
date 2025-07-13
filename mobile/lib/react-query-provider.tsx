// packages/mobile/lib/react-query-provider.tsx
'use client'; // Not strictly needed for RN but doesn't hurt

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

