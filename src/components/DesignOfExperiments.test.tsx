import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import DesignOfExperiments, { UserRole } from './DesignOfExperiments'; // Import UserRole

// Mock lucide-react icons to simplify testing and avoid rendering complex SVGs
jest.mock('lucide-react', () => {
  const originalModule = jest.requireActual('lucide-react');
  const FakeIcon = ({ 'data-testid': dataTestId, ...props }: any) => <svg data-testid={dataTestId || 'mocked-icon'} {...props} />;
  return {
    ...originalModule,
    Plus: (props: any) => <FakeIcon {...props} data-testid="plus-icon" />,
    BarChart3: (props: any) => <FakeIcon {...props} data-testid="barchart3-icon" />,
    X: (props: any) => <FakeIcon {...props} data-testid="x-icon" />,
    Calendar: (props: any) => <FakeIcon {...props} data-testid="calendar-icon" />,
    Save: (props: any) => <FakeIcon {...props} data-testid="save-icon" />,
    ListPlus: (props: any) => <FakeIcon {...props} data-testid="listplus-icon" />,
    Calculator: (props: any) => <FakeIcon {...props} data-testid="calculator-icon" />,
    PieChart: (props: any) => <FakeIcon {...props} data-testid="piechart-icon" />, // Original name before alias
    Presentation: (props: any) => <FakeIcon {...props} data-testid="presentation-icon" />,
    LayoutDashboard: (props: any) => <FakeIcon {...props} data-testid="layoutdashboard-icon" />,
    UploadCloud: (props: any) => <FakeIcon {...props} data-testid="uploadcloud-icon" />,
    AreaChart: (props: any) => <FakeIcon {...props} data-testid="areachart-icon" />,
    UserCircle: (props: any) => <FakeIcon {...props} data-testid="usercircle-icon" />,
    ChevronLeft: (props: any) => <FakeIcon {...props} data-testid="chevronleft-icon" />,
    ChevronRight: (props: any) => <FakeIcon {...props} data-testid="chevronright-icon" />,
    Experiment: (props: any) => <FakeIcon {...props} data-testid="experiment-icon" />,
    ListChecks: (props: any) => <FakeIcon {...props} data-testid="listchecks-icon" />,
    Folder: (props: any) => <FakeIcon {...props} data-testid="folder-icon" />,
    FolderOpen: (props: any) => <FakeIcon {...props} data-testid="folderopen-icon" />,
  };
});

// Mock Recharts components as they are complex and not the focus of these unit tests
jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
    BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
    LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
    ScatterChart: ({ children }: any) => <div data-testid="scatter-chart">{children}</div>,
    Bar: () => <div data-testid="bar-element" />,
    Line: () => <div data-testid="line-element" />,
    Scatter: () => <div data-testid="scatter-element" />,
    XAxis: () => <div data-testid="xaxis-element" />,
    YAxis: () => <div data-testid="yaxis-element" />,
    CartesianGrid: () => <div data-testid="cartesiangrid-element" />,
    Tooltip: () => <div data-testid="tooltip-element" />,
  };
});


describe('DesignOfExperiments Component', () => {
  test('renders without crashing', () => {
    render(<DesignOfExperiments />);
    expect(screen.getByText('DOE Tracking')).toBeInTheDocument();
  });

  test('renders all new DOE Tracking sub-section headers', () => {
    render(<DesignOfExperiments />);
    expect(screen.getByText('DOE Registration')).toBeInTheDocument();
    expect(screen.getByText('Activity Planning & Tracking')).toBeInTheDocument();
    expect(screen.getByText('Performance Evaluation')).toBeInTheDocument();
    expect(screen.getByText('Visualization & Summary')).toBeInTheDocument();
    expect(screen.getByText('Dashboard & Reporting')).toBeInTheDocument();
    expect(screen.getByText('File Upload')).toBeInTheDocument();
    expect(screen.getByText('Embedded Tableau Dashboard')).toBeInTheDocument();
  });

  describe('DOE Registration Form', () => {
    test('renders input fields', () => {
      render(<DesignOfExperiments />);
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
      // Using queryByText for Select because its text might be inside SelectValue
      expect(screen.getByLabelText('Business Unit/Department')).toBeInTheDocument();
      expect(screen.getByLabelText('Location')).toBeInTheDocument();
      expect(screen.getByLabelText('Theme')).toBeInTheDocument();
      expect(screen.getByLabelText('Objective')).toBeInTheDocument();
      expect(screen.getByLabelText('Hypotheses')).toBeInTheDocument();
      expect(screen.getByLabelText('Success Criteria')).toBeInTheDocument();
      expect(screen.getByLabelText('Failure Criteria')).toBeInTheDocument();
      expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
      expect(screen.getByLabelText('End Date')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save DOE' })).toBeInTheDocument();
    });

    test('allows typing in Title input', () => {
      render(<DesignOfExperiments />);
      const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
      fireEvent.change(titleInput, { target: { value: 'Test DOE Title' } });
      expect(titleInput.value).toBe('Test DOE Title');
    });
  });

  describe('Activity Planning & Tracking UI', () => {
    test('renders table headers', () => {
      render(<DesignOfExperiments />);
      expect(screen.getByText('Activity Name')).toBeInTheDocument();
      expect(screen.getByText('Assigned Owner')).toBeInTheDocument(); // Adjusted to match actual text
      expect(screen.getByText('Planned Start')).toBeInTheDocument();
      expect(screen.getByText('Planned End')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Dependencies')).toBeInTheDocument();
      expect(screen.getByText('Comments')).toBeInTheDocument();
    });

    test('renders "Add Activity" button', () => {
      render(<DesignOfExperiments />);
      expect(screen.getByRole('button', { name: 'Add Activity' })).toBeInTheDocument();
    });
  });

  describe('Performance Evaluation Form', () => {
    test('renders metric input fields', () => {
      render(<DesignOfExperiments />);
      // Use a function to get by label text more robustly when elements might be repeated for Pre/Post
      const getMetricInput = (metricName: string, type: 'Pre' | 'Post') => {
        // This is a bit of a hack due to how labels and inputs are structured for tables.
        // A better way would be to have more specific test IDs or aria-labels.
        // For now, we'll find all inputs of a certain type and assume order or filter by placeholder.
        // This example will just check for one to simplify.
        const labels = screen.getAllByText(metricName);
        // Find the input associated with the first label that seems to be for Pre-Project or Post-Project context
        // This is not ideal and depends on DOM structure.
        // A more robust way would be to add data-testid or more specific aria-labelledby
        return screen.getByLabelText(metricName, { selector: 'input[placeholder*="e.g.,"]'});
      };

      expect(screen.getByText('Turnaround Time')).toBeInTheDocument();
      expect(screen.getByText('Cost')).toBeInTheDocument();
      expect(screen.getByText('Quality (e.g., % defects)')).toBeInTheDocument();
      expect(screen.getByText('Compliance (e.g., % adherence)')).toBeInTheDocument();

      // Example of testing one input (this is still not very specific)
      // To make this better, one might add test-ids to the inputs themselves.
      // For now, we check one of the labels implies the section exists.
      expect(screen.getByLabelText('Inference / Reason for variance')).toBeInTheDocument();
      expect(screen.getByLabelText('Final Outcome / Action Plan')).toBeInTheDocument();
    });
  });

  // Helper function to change the user role for RBAC tests
  // This interacts with the temporary role switcher UI
  const setUserRoleForTest = (role: UserRole) => {
    const roleSwitcher = screen.getByLabelText('Current User Role (Test):');
    fireEvent.mouseDown(roleSwitcher); // Open the dropdown
    // Select the option. Need to ensure options are rendered.
    // This assumes SelectContent is rendered into the body or a portal.
    // Using `within` might be needed if it's complex.
    // For ShadCN select, it often renders options in a portal.
    // We will find the item by its text content.
    const option = screen.getByText(role, { selector: '[role="option"]' }); // Adjust selector if needed
    fireEvent.click(option);
  };


  describe('RBAC Functionality', () => {
    describe('Admin Role', () => {
      beforeEach(() => {
        render(<DesignOfExperiments />);
        setUserRoleForTest(UserRole.Admin);
      });

      test('enables "Save DOE" button', () => {
        expect(screen.getByRole('button', { name: 'Save DOE' })).not.toBeDisabled();
      });
      test('enables DOE registration inputs', () => {
        expect(screen.getByLabelText('Title')).not.toBeDisabled();
      });
      test('enables "Add Activity" button', () => {
        expect(screen.getByRole('button', { name: 'Add Activity' })).not.toBeDisabled();
      });
      test('enables performance evaluation inputs', () => {
        expect(screen.getByLabelText('Inference / Reason for variance')).not.toBeDisabled();
      });
    });

    describe('DOE Owner Role', () => {
      beforeEach(() => {
        render(<DesignOfExperiments />);
        setUserRoleForTest(UserRole.DOE_Owner);
      });

      test('enables "Save DOE" button', () => {
        expect(screen.getByRole('button', { name: 'Save DOE' })).not.toBeDisabled();
      });
      test('enables DOE registration inputs', () => {
        expect(screen.getByLabelText('Title')).not.toBeDisabled();
      });
       test('enables "Add Activity" button', () => {
        expect(screen.getByRole('button', { name: 'Add Activity' })).not.toBeDisabled();
      });
      test('enables performance evaluation inputs', () => {
        expect(screen.getByLabelText('Inference / Reason for variance')).not.toBeDisabled();
      });
    });

    describe('Activity Owner Role', () => {
      beforeEach(() => {
        render(<DesignOfExperiments />);
        setUserRoleForTest(UserRole.Activity_Owner);
      });

      test('disables "Save DOE" button', () => {
        expect(screen.getByRole('button', { name: 'Save DOE' })).toBeDisabled();
      });
      test('disables DOE registration inputs', () => {
        expect(screen.getByLabelText('Title')).toBeDisabled();
      });
       test('disables "Add Activity" button', () => {
        expect(screen.getByRole('button', { name: 'Add Activity' })).toBeDisabled();
      });
      test('disables performance evaluation inputs', () => {
        // Check one specific input from performance evaluation
        expect(screen.getByLabelText('Inference / Reason for variance')).toBeDisabled();
      });
    });

    describe('Viewer Role', () => {
      beforeEach(() => {
        render(<DesignOfExperiments />);
        setUserRoleForTest(UserRole.Viewer);
      });

      test('disables "Save DOE" button', () => {
        expect(screen.getByRole('button', { name: 'Save DOE' })).toBeDisabled();
      });
      test('disables DOE registration inputs', () => {
        expect(screen.getByLabelText('Title')).toBeDisabled();
      });
      test('disables "Add Activity" button', () => {
        expect(screen.getByRole('button', { name: 'Add Activity' })).toBeDisabled();
      });
      test('disables performance evaluation inputs', () => {
        expect(screen.getByLabelText('Inference / Reason for variance')).toBeDisabled();
      });
    });
  });
});
