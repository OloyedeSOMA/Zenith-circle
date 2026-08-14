const SAVED_OPPORTUNITIES_KEY = "savedOpportunities";
const APPLIED_OPPORTUNITIES_KEY = "appliedOpportunities";

const getStoredIds = (key: string): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(key);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const setStoredIds = (key: string, ids: string[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(ids));
};

export const getSavedOpportunityIds = (): string[] => {
  return getStoredIds(SAVED_OPPORTUNITIES_KEY);
};

export const isOpportunitySaved = (opportunityId: string): boolean => {
  return getSavedOpportunityIds().includes(opportunityId);
};

export const addSavedOpportunity = (opportunityId: string) => {
  const ids = getSavedOpportunityIds();

  if (!ids.includes(opportunityId)) {
    setStoredIds(SAVED_OPPORTUNITIES_KEY, [...ids, opportunityId]);
  }
};

export const removeSavedOpportunity = (opportunityId: string) => {
  const ids = getSavedOpportunityIds();

  setStoredIds(
    SAVED_OPPORTUNITIES_KEY,
    ids.filter((id) => id !== opportunityId)
  );
};

export const getAppliedOpportunityIds = (): string[] => {
  return getStoredIds(APPLIED_OPPORTUNITIES_KEY);
};

export const isOpportunityApplied = (opportunityId: string): boolean => {
  return getAppliedOpportunityIds().includes(opportunityId);
};

export const addAppliedOpportunity = (opportunityId: string) => {
  const ids = getAppliedOpportunityIds();

  if (!ids.includes(opportunityId)) {
    setStoredIds(APPLIED_OPPORTUNITIES_KEY, [...ids, opportunityId]);

    window.dispatchEvent(
      new CustomEvent("applied-opportunities-updated")
    );
  }
};

export const removeAppliedOpportunity = (opportunityId: string) => {
  const ids = getAppliedOpportunityIds();

  setStoredIds(
    APPLIED_OPPORTUNITIES_KEY,
    ids.filter((id) => id !== opportunityId)
  );

  window.dispatchEvent(
    new CustomEvent("applied-opportunities-updated")
  );
};