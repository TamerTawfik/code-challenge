import { useState } from "react";
import { SkipSelection } from "@/components/SkipSelection";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useSkips } from "@/hooks/useSkips";
import {
  Menu,
  MapPin,
  Trash2,
  Container,
  FileCheck,
  Calendar,
  CreditCard,
} from "lucide-react";

const STEPS = [
  { id: "postcode", label: "Postcode", icon: MapPin },
  { id: "waste-type", label: "Waste Type", icon: Trash2 },
  { id: "select-skip", label: "Select Skip", icon: Container },
  { id: "permit-check", label: "Permit Check", icon: FileCheck },
  { id: "choose-date", label: "Choose Date", icon: Calendar },
  { id: "payment", label: "Payment", icon: CreditCard },
];

function App() {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isStepsOpen, setIsStepsOpen] = useState(false);

  // Fetch skips data for the drawer
  const { skips } = useSkips({
    postcode: "NR32",
    area: "Lowestoft",
  });

  const handleSkipSelect = (skipId: number) => {
    setSelectedSkipId(skipId);
    setIsDrawerOpen(true);
  };

  const handleContinue = () => {
    setIsDrawerOpen(false);
    setCurrentStep(3);
  };

  const handleBack = () => {
    setIsDrawerOpen(false);
    setSelectedSkipId(null);
  };

  const selectedSkip = skips.find((skip) => skip.id === selectedSkipId);

  const StepsList = () => (
    <div className="relative">
      {/* Vertical Progress Line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-muted-foreground/20" />
      <div
        className="absolute left-4 top-4 w-0.5 bg-primary transition-all duration-500 ease-in-out"
        style={{
          height: `${Math.max(0, (currentStep / (STEPS.length - 1)) * 100)}%`,
        }}
      />

      <div className="space-y-6">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step.id}
              className="relative flex items-center space-x-4 group"
            >
              {/* Step Circle */}
              <div
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : isCurrent
                    ? "border-primary bg-background text-primary ring-4 ring-primary/20 shadow-md"
                    : "border-muted-foreground/40 bg-background text-muted-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isCurrent ? "animate-pulse" : ""}`}
                />
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isCompleted
                      ? "text-foreground"
                      : isCurrent
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Current step
                  </p>
                )}
                {isCompleted && (
                  <p className="text-xs text-green-600 mt-1">Completed</p>
                )}
              </div>

              {/* Status Indicator */}
              {isCompleted && (
                <div className="flex h-2 w-2 rounded-full bg-green-500 animate-fade-in" />
              )}
              {isCurrent && (
                <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Steps Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsStepsOpen(true)}
          className="bg-background"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Steps Drawer */}
      <Drawer open={isStepsOpen} onOpenChange={setIsStepsOpen}>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Booking Steps</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            <StepsList />
          </div>
        </DrawerContent>
      </Drawer>

      <div className="flex">
        {/* Desktop Steps Sidebar */}
        <div className="hidden lg:block w-64">
          <div className="fixed top-0 left-0 w-64 h-screen border-r bg-muted/40 p-6 overflow-y-auto">
            <div className="pt-8">
              <StepsList />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8 mt-16 lg:mt-8">
            {currentStep === 2 && (
              <SkipSelection onSkipSelect={handleSkipSelect} />
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Drawer */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="right"
      >
        <DrawerContent className="max-w-md ml-auto h-full overflow-y-auto overflow-x-hidden">
          <DrawerHeader className="pb-4">
            <DrawerTitle className="text-center text-xl font-bold">
              Confirm Skip Selection
            </DrawerTitle>

            {/* Disclaimer */}
            <div className="text-center mt-4 mb-6">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification, colours may vary,
                options and/or accessories may be featured at additional cost.
              </p>
            </div>

            {/* Skip Details */}
            <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedSkip?.size} Yard Skip
                </h3>
              </div>

              {/* Single Column Layout for Right Side */}
              <div className="space-y-4">
                {/* Price Information */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Pricing Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Total Price:
                      </span>
                      <span className="text-lg font-bold text-primary">
                        £
                        {selectedSkip
                          ? (
                              (selectedSkip.price_before_vat *
                                (100 + selectedSkip.vat)) /
                              100
                            ).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Including VAT ({selectedSkip?.vat}%):
                      </span>
                      <span className="text-muted-foreground">
                        £
                        {selectedSkip
                          ? (
                              (selectedSkip.price_before_vat *
                                selectedSkip.vat) /
                              100
                            ).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hire Period */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Hire Information
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      Hire period: {selectedSkip?.hire_period_days} days
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Features
                  </h4>
                  <div className="space-y-2">
                    {selectedSkip?.allowed_on_road && (
                      <div className="flex items-center text-sm text-green-600">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        Road Legal
                      </div>
                    )}
                    {selectedSkip?.allows_heavy_waste && (
                      <div className="flex items-center text-sm text-blue-600">
                        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        Heavy Waste Accepted
                      </div>
                    )}
                    {!selectedSkip?.allowed_on_road && (
                      <div className="flex items-center text-sm text-amber-600">
                        <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        </div>
                        Permit Required
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-4 text-center">
                    Ready to proceed?
                  </h4>
                  <div className="space-y-3">
                    <Button
                      onClick={handleContinue}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Continue to Next Step
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-lg transition-all duration-200"
                    >
                      Go Back & Change
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default App;
