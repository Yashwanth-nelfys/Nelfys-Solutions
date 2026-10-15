export type GitHubUser = { login:string; name:string|null; avatar_url:string; html_url:string; bio:string|null; public_repos:number; followers:number; following:number; location:string|null; blog:string|null };
export type GitHubRepo = { id:number; name:string; full_name:string; description:string|null; html_url:string; stargazers_count:number; forks_count:number; language:string|null; updated_at:string; fork:boolean; archived:boolean };
const headers = { Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28', 'User-Agent':'nelfys-solutions-website' };
export async function getGitHubData() {
 const fallback = { user:null as GitHubUser|null, repos:[] as GitHubRepo[], error:'GitHub information is temporarily unavailable.' };
 try {
  const [userRes, reposRes] = await Promise.all([
   fetch('https://api.github.com/users/yashwanth-nelfys',{headers,next:{revalidate:3600}}),
   fetch('https://api.github.com/users/yashwanth-nelfys/repos?sort=updated&per_page=12',{headers,next:{revalidate:1800}})
  ]);
  if (!userRes.ok || !reposRes.ok) return {...fallback,error:userRes.status===403||reposRes.status===403?'GitHub rate limit reached. Please visit the public profile directly.':'Could not load GitHub data right now. Please visit the public profile directly.'};
  const user = await userRes.json() as GitHubUser;
  const repos = (await reposRes.json() as GitHubRepo[]).filter(r=>!r.archived);
  return {user,repos,error:null as string|null};
 } catch { return fallback; }
}
