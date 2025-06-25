const TermsAndConditions = () => {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-start px-4 py-6"
        style={{
          background:
            "radial-gradient(farthest-side ellipse at 10% 0, #333867 20%, #17193b)",
        }}
      >
        <div className="bg-[#141833] text-white rounded-lg p-6 shadow-lg w-full max-w-3xl">
          {/* Main Title */}
          <h2 className="text-2xl font-bold text-center mb-6">
            Terms & Conditions
          </h2>
  
          {/* Introduction */}
          <div className="text-gray-300 text-xl mb-6">
            <p>
              Welcome to our platform. Before proceeding, please read the terms
              carefully. By accepting a job, you agree to abide by the following
              conditions.
            </p>
          </div>
  
          {/* Deletion Policy */}
          <div className="text-gray-300 text-sm space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">
              Deletion Policy
            </h3>
            <ul className="list-disc text-lg list-inside space-y-2">
              <li>
              Arrive on time and perform the required duties professionally. 
              </li>
              <li>
              Follow all instructions, rules and safety protocols related to the specific shift. 
              </li>
              <li>
              Complete the shift in full, unless an emergency arises. 
              </li>
              <li>
              Notify the Company immediately if you are unable to attend a shift. 
              </li>
              <li>
              Failure to show up, repeated cancellations, or non-compliance may result in account suspension or termination. 
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default TermsAndConditions;
                                                                     