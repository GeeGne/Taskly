import { NextRouter } from 'next/router'; // Import if using Next.js, or adjust for your router

interface User {
  id: string;
  name: string;
}

class Redirector {
  router: NextRouter;
  pathname: string;

  constructor(router) {
    this.router = router;
    this.pathname = window.location.pathname;
  }

  home (user: User | null) {
    if (user && this.pathname === '/') {
      this.router.push('/myTasks');
      return;
    }

    if (!user) this.router.push('/');
  }

}

export default Redirector;