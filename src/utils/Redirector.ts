
class Redirector {
  router: any;
  pathname: string;

  constructor(router: any) {
    this.router = router;
    this.pathname = window.location.pathname;
  }

  home (user: {} | null | undefined) {
    if (user && this.pathname === '/') {
      this.router.push('/myTasks');
      return;
    }

    if (!user) this.router.push('/');
  }

}

export default Redirector;