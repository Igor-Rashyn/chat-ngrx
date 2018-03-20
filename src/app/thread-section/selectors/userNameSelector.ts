export function userNameSelector(state: any):string{
  const {app} = state,
    userId = app.userId,
    currentParticipant = app.participants[userId];

  if(!currentParticipant){
    return "";
  }

  return currentParticipant.name;
}