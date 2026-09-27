import { ActionGateDrawer } from "./action-gate/ActionGateDrawer";
import { ActionGateChecklistButton } from "./action-gate/ActionGateChecklistButton";
import { ActionGateBackButton } from "./action-gate/ActionGateBackButton";
import { ActionGateCTA } from "./action-gate/ActionGateCTA";
import { useActionGateState } from "./action-gate/useActionGateState";
import type { ActionGateProps } from "./action-gate/types";

export type { ActionGateProps } from "./action-gate/types";

export function ActionGateBar(props: ActionGateProps) {
  const state = useActionGateState(props);

  return (
    <div className="sticky bottom-0 z-40 mt-auto border-t bg-background/95 backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-200 ease-out pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
      {state.showChecklistDetails && (
        <ActionGateDrawer
          title={state.currentStep.title}
          checklist={state.checklist}
          onClose={() => state.setShowChecklistDetails(false)}
        />
      )}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5">
        <ActionGateChecklistButton
          satisfiedCount={state.satisfiedCount}
          totalCount={state.totalCount}
          allSatisfied={state.allSatisfied}
          missingItems={state.missingItems}
          isOpen={state.showChecklistDetails}
          onToggle={() =>
            state.setShowChecklistDetails(!state.showChecklistDetails)
          }
          completedSteps={state.completedSteps}
          totalSteps={state.totalSteps}
          currentStepId={state.currentStepId}
        />
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <ActionGateBackButton
            prevStepRoute={state.prevStepRoute}
            prevStepLabel={state.prevStepLabel}
          />
          <ActionGateCTA
            primaryAction={props.primaryAction}
            nextStepRoute={state.nextStepRoute}
            nextStepLabel={state.nextStepLabel}
            canProceedToNext={state.canProceedToNext}
            onNextClick={state.handleNextClick}
          />
        </div>
      </div>
    </div>
  );
}
