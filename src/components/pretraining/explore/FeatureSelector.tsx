import {
  useFeatureSelector,
  type UseFeatureSelectorProps,
} from "./useFeatureSelector";
import { FeatureSelectorHeader } from "./feature-selector/FeatureSelectorHeader";
import { FeatureSelectorAddDropdown } from "./feature-selector/FeatureSelectorAddDropdown";
import { SelectedFeaturesList } from "./feature-selector/SelectedFeaturesList";

export type FeatureSelectorProps = UseFeatureSelectorProps;

export function FeatureSelector(props: FeatureSelectorProps) {
  const f = useFeatureSelector(props);

  return (
    <div className="space-y-4">
      <FeatureSelectorHeader
        hasFeatures={f.selectedFeatures.length > 0}
        onClear={f.clearFeatures}
      />
      <FeatureSelectorAddDropdown
        columns={f.numericColumns}
        onAdd={f.handleAddFeature}
      />
      <SelectedFeaturesList
        selectedFeatures={f.selectedFeatures}
        availableInteractionColumns={f.availableInteractionColumns}
        onRemove={f.handleRemoveFeature}
        onTransformChange={f.handleTransformationChange}
        onDegreeChange={f.handlePolynomialDegreeChange}
        onInteractionChange={f.handleInteractionColumnChange}
      />
    </div>
  );
}
