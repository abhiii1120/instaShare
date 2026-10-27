import { RouterProvider } from 'react-router'
import { router } from './app/router.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/queryClient.js'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import AuthInitializer from './components/common/AuthInitializer.jsx'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthInitializer>
        <RouterProvider router={router} />
        </AuthInitializer>
      </Provider>
    </QueryClientProvider>
  )
}

export default App