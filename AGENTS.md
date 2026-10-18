<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Authentication uses a single root session listener and AuthContext; all account controls share that state to avoid stale sign-in indicators.
- Profiles are created by an Auth lifecycle trigger and read/updated only by their owner through RLS; profile metadata never grants permissions.
- Public auth pages share AuthForm; existing marketplace panels remain demo-only until their data and permissions are connected.
